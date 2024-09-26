package com.lucky.arbaguette.schedule.service;

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
import com.lucky.arbaguette.schedule.dto.response.*;
import com.lucky.arbaguette.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.lucky.arbaguette.common.util.DateFormatUtil.getEndOfMonth;
import static com.lucky.arbaguette.common.util.DateFormatUtil.getStartOfMonth;
import static com.lucky.arbaguette.schedule.domain.StatusType.*;
import static com.lucky.arbaguette.schedule.dto.response.DailyScheduleResponse.CrewScheduleInfo;
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.DailySchedule;
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.MonthlySchedule;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CrewRepository crewRepository;
    private final ContractRepository contractRepository;
    private final ContractWorkingDayRepository contractWorkingDayRepository;
    private final CompanyRepository companyRepository;

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
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername()).orElseThrow(() -> new UnAuthorizedException("사용자를 찾을 수 없습니다."));
        Contract contract = contractRepository.findByCrew(crew).orElseThrow(() -> new NotFoundException("근로 계약서를 찾을 수 없습니다."));
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
                Optional<Schedule> schedule = scheduleRepository.findByCrewAndMonthAndDay(crew, month, date);
                if (schedule.isPresent()) {
                    dailySchedules.add(DailySchedule.from(crew, schedule.get()));
                }
            }

            monthlyScheduleList.add(MonthlySchedule.from(date, dailySchedules));
        }

        return new MonthlyScheduleResponse(monthlyScheduleList);

    }

    public DailyScheduleResponse getDaySchedules(CustomUserDetails customUserDetails, int companyId, LocalDate date) {
        Company company = companyRepository.findByCompanyIdAndBoss_Email(companyId, customUserDetails.getUsername()).orElseThrow(() -> new NotFoundException("사업장을 찾을 수 없습니다."));

        List<Crew> crews = crewRepository.findByCompany(company);
        //알바생들의 Id만 리스트로 추출
        List<Integer> crewIds = crews.stream()
                .map(Crew::getCrewId)
                .toList();
        List<CrewScheduleInfo> crewScheduleInfos = scheduleRepository.findByStartTimeAndCrewIdIn(date, crewIds).stream()
                .map(CrewScheduleInfo::from)
                .toList();
        //전체 count
        int totalCount = crewScheduleInfos.size();
        //출근, 지각, 조퇴 count
        int normalCount = (int) crewScheduleInfos.stream()
                .filter(crewScheduleInfo -> (crewScheduleInfo.status() == NORMAL) || (crewScheduleInfo.status() == LATE) || (crewScheduleInfo.status() == EARLY))
                .count();
        //결근 count
        int absentCount = (int) crewScheduleInfos.stream()
                .filter(crewScheduleInfo -> crewScheduleInfo.status() == ABSENT)
                .count();
        //미출근 count
        int yetCount = totalCount - normalCount - absentCount;
        return DailyScheduleResponse.from(totalCount, normalCount, absentCount, yetCount, crewScheduleInfos);
    }
}

