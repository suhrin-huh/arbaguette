package com.lucky.arbaguette.schedule.service;

import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.DuplicateException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.company.repository.CompanyRepository;
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
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.DailySchedule;
import static com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse.MonthlySchedule;

@RequiredArgsConstructor
@Service
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CrewRepository crewRepository;
    private final CompanyRepository companyRepository;
    private final BossRepository bossRepository;

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
}
