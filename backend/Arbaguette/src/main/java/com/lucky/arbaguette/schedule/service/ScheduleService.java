package com.lucky.arbaguette.schedule.service;

import static com.lucky.arbaguette.common.util.DateFormatUtil.getEndOfMonth;
import static com.lucky.arbaguette.common.util.DateFormatUtil.getStartOfMonth;
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.DailySchedule;
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.MonthlySchedule;

import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.DuplicateException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.common.exception.UnAuthorizedException;
import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.company.repository.CompanyRepository;
import com.lucky.arbaguette.contract.Repository.ContractRepository;
import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.contractworkingday.domain.ContractWorkingDay;
import com.lucky.arbaguette.contractworkingday.repository.ContractWorkingDayRepository;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.dto.ScheduleStatusCount;
import com.lucky.arbaguette.schedule.dto.request.ScheduleSaveRequest;
import com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleCommutesResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleNextResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleSaveResponse;
import com.lucky.arbaguette.schedule.repository.ScheduleRepository;
import com.lucky.arbaguette.substitute.repository.SubstituteRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CrewRepository crewRepository;
    private final ContractRepository contractRepository;
    private final ContractWorkingDayRepository contractWorkingDayRepository;
    private final CompanyRepository companyRepository;
    private final BossRepository bossRepository;
    private final SubstituteRepository substituteRepository;

    public ScheduleSaveResponse saveCrewCommute(CustomUserDetails customUserDetails, ScheduleSaveRequest request,
                                                LocalDateTime nowTime) {
        Crew crew = crewRepository.findByCompany_CompanyIdAndEmail(request.companyId(), customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."));

        Schedule schedule = scheduleRepository.findByCrewAndTime(crew.getCrewId(), nowTime)
                .orElseThrow(() -> new BadRequestException("출근 날짜가 아닙니다."));

        if (schedule.isAlreadyOutWork()) {
            throw new DuplicateException("이미 퇴근처리 되었습니다.");
        }

        if (schedule.isBeforeWork()) {
            schedule.inWork(nowTime);
            return ScheduleSaveResponse.from(schedule.getStatusMessage(), nowTime);
        }

        schedule.outWork(nowTime);
        return ScheduleSaveResponse.from("퇴근 완료", nowTime);
    }

    public ScheduleNextResponse getNextCommute(CustomUserDetails customUserDetails, LocalDateTime nowTime) {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."));

        Schedule schedule = scheduleRepository.findNextByCrewAndTime(crew.getCrewId(), nowTime)
                .orElseThrow(() -> new BadRequestException("출근할 수 있는 날짜가 없습니다."));

        return ScheduleNextResponse.from(schedule, crew);
    }

    public ScheduleCommutesResponse getCommutes(CustomUserDetails customUserDetails, LocalDate targetDate) {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."));

        LocalDateTime date = LocalDateTime.now();
        if (targetDate != null) {
            date = targetDate.atStartOfDay();
        }

        List<Schedule> schedules = scheduleRepository.findScheduleByCrewAndMonth(
                crew.getCrewId(),
                getStartOfMonth(date),
                getEndOfMonth(date)
        );

        if (schedules.isEmpty()) {
            throw new NotFoundException("근무 내역을 찾을 수 없습니다.");
        }

        List<ScheduleStatusCount> statusCounts = scheduleRepository.countByStatus();

        return ScheduleCommutesResponse.from(
                crew,
                date,
                statusCounts,
                schedules
        );
    }

    public void saveSchedule(CustomUserDetails customUserDetails) {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new UnAuthorizedException("사용자를 찾을 수 없습니다."));
        Contract contract = contractRepository.findByCrew(crew)
                .orElseThrow(() -> new NotFoundException("근로 계약서를 찾을 수 없습니다."));
        //근로계약서 안의 startDate ~ endDate 기간 내에
        // 근무계약일 요일,시간에 해당하는 스케줄을 만든다.
        List<ContractWorkingDay> workingDays = contractWorkingDayRepository.findAllByContract(contract);

        //근로계약서 상 계약시작일~
        LocalDate currentDate = contract.getStartDate();
        //근로계약서 상 계약 종료일
        LocalDate endDate = contract.getEndDate();
        while ((!currentDate.isAfter(endDate))) {
            //람다 내부에서 사용되는 변수는 final 이어야함
            final LocalDate dateForSchedule = currentDate;
            int currentWeekDay = (dateForSchedule.getDayOfWeek().getValue() % 7) - 1;
            workingDays.stream()
                    .filter(workingDay -> workingDay.getId().getWeekday() == currentWeekDay)
                    .forEach(workingDay -> {
                        //스케줄 생성
                        LocalDateTime startTime = LocalDateTime.of(dateForSchedule, workingDay.getStartTime());
                        LocalDateTime endTime = LocalDateTime.of(dateForSchedule, workingDay.getEndTime());

                        Schedule schedule = Schedule.builder()
                                .crew(crew)
                                .startTime(startTime)
                                .endTime(endTime)
                                .build();
                        scheduleRepository.save(schedule);
                    });
            currentDate = currentDate.plusDays(1);
        }
    }

    public MonthlyScheduleResponse getMonthlySchedules(CustomUserDetails customUserDetails, int month, int companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("해당하는 회사를 찾을 수 없습니다."));

        List<MonthlySchedule> monthlyScheduleList = new ArrayList<>();
        for (int date = 1; date <= 31; date++) {
            List<DailySchedule> dailySchedules = new ArrayList<>();

            for (Crew crew : crewRepository.findByCompany(company)) {
                scheduleRepository.findByCrewAndMonthAndDay(crew, month, date)
                        .ifPresent(schedule -> {
                            boolean isSubstitute = substituteRepository.findByScheduleAndPermitIsFalse(schedule)
                                    .map(substitute -> !substitute.isPermit())
                                    .orElse(false);
                            dailySchedules.add(DailySchedule.from(
                                    crew,
                                    schedule,
                                    isSubstitute));
                        });
            }

            monthlyScheduleList.add(MonthlySchedule.from(date, dailySchedules));
        }

        return new MonthlyScheduleResponse(monthlyScheduleList);

    }
}

