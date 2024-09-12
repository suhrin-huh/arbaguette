package com.lucky.arbaguette.boss.service;

import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.company.repository.CompanyRepository;
import com.lucky.arbaguette.contract.Repository.ContractRepository;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.domain.dto.response.CrewInfo;
import com.lucky.arbaguette.crew.domain.dto.response.CrewListResponse;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BossService {

    private final CompanyRepository companyRepository;
    private final CrewRepository crewRepository;
    private final ContractRepository contractRepository;
    private final ScheduleRepository scheduleRepository;

    public CrewListResponse getCrewList(int companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException());
        List<Crew> crewList = crewRepository.findByCompany(company);
        List<CrewInfo> crewInfoList = new ArrayList<>();

        // --------crewList로 salary계산해서 CrewListResponse로 return
        for (Crew crew : crewList) {
            int hourlyRate = contractRepository.findByCrew(crew)
                    .orElseThrow(() -> new NotFoundException())
                    .getSalary();

            int salary = hourlyRate * calculateWorkHours(scheduleRepository.findScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(), getEndOfMonth()));
            crewInfoList.add(new CrewInfo(crew.getCrewId(), crew.getName(), crew.getProfileImage(), salary));
        }
        return new CrewListResponse(crewInfoList);

    }

    public int calculateWorkHours(List<Schedule> schedules) {
        int totalHours = 0;
        for (Schedule schedule : schedules) {
            if (schedule.getInTime() != null && schedule.getOutTime() != null) {
                Duration duration = Duration.between(schedule.getInTime(), schedule.getOutTime());
                totalHours += duration.toHours();
            }
        }
        return totalHours;
    }

    public LocalDateTime getStartOfMonth() {
        return LocalDateTime.now().withDayOfMonth(1).with(LocalTime.MIN); // 월의 1일 00:00:00
    }

    public LocalDateTime getEndOfMonth() {
        return LocalDateTime.now().withDayOfMonth(LocalDate.now().lengthOfMonth()).with(LocalTime.MAX); // 월의 마지막 날 23:59:59
    }
}
