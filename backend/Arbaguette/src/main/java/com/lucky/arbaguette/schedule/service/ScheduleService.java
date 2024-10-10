package com.lucky.arbaguette.schedule.service;

import static com.lucky.arbaguette.common.util.DateFormatUtil.getEndOfMonth;
import static com.lucky.arbaguette.common.util.DateFormatUtil.getStartOfMonth;
import static com.lucky.arbaguette.schedule.domain.StatusType.ABSENT;
import static com.lucky.arbaguette.schedule.domain.StatusType.EARLY;
import static com.lucky.arbaguette.schedule.domain.StatusType.LATE;
import static com.lucky.arbaguette.schedule.domain.StatusType.NORMAL;
import static com.lucky.arbaguette.schedule.dto.response.DailyScheduleResponse.CrewScheduleInfo;
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.DailySchedule;
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.MonthlySchedule;

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
import com.lucky.arbaguette.schedule.dto.response.DailyScheduleResponse;
import com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleCommutesResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleNextResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleSaveResponse;
import com.lucky.arbaguette.schedule.repository.ScheduleRepository;
import com.lucky.arbaguette.substitute.domain.Substitute;
import com.lucky.arbaguette.substitute.repository.SubstituteRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CrewRepository crewRepository;
    private final ContractRepository contractRepository;
    private final ContractWorkingDayRepository contractWorkingDayRepository;
    private final CompanyRepository companyRepository;

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

        ScheduleStatusCount statusCounts = scheduleRepository.countByStatus(
                crew.getCrewId(),
                getStartOfMonth(date),
                getEndOfMonth(date)
        );

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
        //일하기로 시작한 달과 현재 달이 다르면 현재 달에 해당하는 스케줄을 만들 필요 없음
        if (contract.nowMonthNotInWorkingPeriod()) {
            return;
        }
        LocalDate now = LocalDate.now();
        LocalDate startDate = contract.getStartDate(); //계약 첫 날
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth()); //이번달의 마지막 날

        saveScheduleInContractPeriod(contract, startDate, endDate);
    }

    @Scheduled(cron = "0 0 0 1 * *")
    public void autoSchedule() {
        List<Contract> contracts = contractRepository.findAll();
        for (Contract contract : contracts) {
            //현재 날짜가 계약 기간 내에 속하지 않으면 종료
            if (contract.notInWorkingPeriod()) {
                return;
            }
            //이번 달의 스케줄 만들 첫날과 끝날 정하기
            LocalDate now = LocalDate.now();
            LocalDate startDate = now.withDayOfMonth(1);//이번 달의 첫 날
            LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth()); //이번 달의 마지막 날

            saveScheduleInContractPeriod(contract, startDate, endDate);
        }
    }

    private void saveScheduleInContractPeriod(Contract contract, LocalDate startDate, LocalDate endDate) {
        //근로계약서 안의 startDate ~ endDate 기간 내에 근무계약일 요일,시간에 해당하는 스케줄을 만든다.
        List<ContractWorkingDay> workingDays = contractWorkingDayRepository.findAllByContract(contract);
        while ((!startDate.isAfter(endDate))) {
            //람다 내부에서 사용되는 변수는 final 이어야함
            final LocalDate dateForSchedule = startDate;
            int currentWeekDay = (dateForSchedule.getDayOfWeek().getValue() % 7) - 1;
            workingDays.stream()
                    .filter(workingDay -> workingDay.getId().getWeekday() == currentWeekDay)
                    .forEach(workingDay -> {
                        //스케줄 생성
                        LocalDateTime startTime = LocalDateTime.of(dateForSchedule, workingDay.getStartTime());
                        LocalDateTime endTime = LocalDateTime.of(dateForSchedule, workingDay.getEndTime());
                        if (scheduleRepository.existsByCrewAndStartTime(contract.getCrew(), startTime)) {
                            return;
                        }
                        Schedule schedule = Schedule.builder()
                                .crew(contract.getCrew())
                                .startTime(startTime)
                                .endTime(endTime)
                                .build();
                        scheduleRepository.save(schedule);
                    });
            startDate = startDate.plusDays(1);
        }
    }

    @Scheduled(cron = "0 0 0/1 * * *")
    public void autoAbsenceProcessing() {
        // 지금 status가 null 이면서 지금시간에 퇴근시간이 지난거 찾기.
        List<Schedule> schedules = scheduleRepository.findByEndTimeBeforeAndStatusIsNull(LocalDateTime.now());

        // 상태를 ABSENT로 변경
        for (Schedule schedule : schedules) {
            schedule.markAsAbsent();
        }

    }

    public MonthlyScheduleResponse getMonthlySchedules(CustomUserDetails customUserDetails, int month,
                                                       int companyId) {
        if (companyId == 0) {
            companyId = crewRepository.findByEmail(customUserDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("해당하는 회사를 찾을 수 없습니다."))
                    .getCompany().getCompanyId();
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("해당하는 회사를 찾을 수 없습니다."));

        List<MonthlySchedule> monthlyScheduleList = new ArrayList<>();
        for (int date = 1; date <= 31; date++) {
            List<DailySchedule> dailySchedules = new ArrayList<>();

            for (Crew crew : crewRepository.findByCompany(company)) {
                scheduleRepository.findByCrewAndMonthAndDay(crew, month, date)
                        .ifPresent(schedule -> {
                            Optional<Substitute> substitute = substituteRepository.findByScheduleAndPermitIsFalse(
                                    schedule);
                            dailySchedules.add(DailySchedule.from(
                                    crew,
                                    schedule,
                                    substitute));
                        });
            }

            monthlyScheduleList.add(MonthlySchedule.from(date, dailySchedules));
        }

        return new MonthlyScheduleResponse(monthlyScheduleList);

    }

    public DailyScheduleResponse getDaySchedules(CustomUserDetails customUserDetails, int companyId,
                                                 LocalDate date) {
        Company company = findCompany(customUserDetails, companyId);
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
                .filter(crewScheduleInfo -> (crewScheduleInfo.status() == NORMAL) || (crewScheduleInfo.status() == LATE)
                        || (crewScheduleInfo.status() == EARLY))
                .count();
        //결근 count
        int absentCount = (int) crewScheduleInfos.stream()
                .filter(crewScheduleInfo -> crewScheduleInfo.status() == ABSENT)
                .count();
        //미출근 count
        int yetCount = totalCount - normalCount - absentCount;
        return DailyScheduleResponse.from(totalCount, normalCount, absentCount, yetCount, crewScheduleInfos);
    }

    private Company findCompany(CustomUserDetails customUserDetails, int companyId) {
        if (customUserDetails.isCrew()) {
            return crewRepository.findByEmail(customUserDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("사업장을 찾을 수 없습니다.")).getCompany();
        }
        return companyRepository.findByCompanyIdAndBoss_Email(companyId, customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("사업장을 찾을 수 없습니다."));
    }
}

