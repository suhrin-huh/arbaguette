package com.lucky.arbaguette.boss.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.dto.CrewSaveRequest;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.DuplicateException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.common.exception.UnAuthorizedException;
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
    private final BossRepository bossRepository;

    public CrewListResponse getCrews(CustomUserDetails customUserDetails, int companyId) {
        Boss boss = bossRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("해당 사장님을 찾을 수 없습니다."));
        Company company = companyRepository.findByCompanyIdAndBoss(companyId, boss)
                .orElseThrow(() -> new UnAuthorizedException("알바생 조회 권한이 없습니다."));

        List<Crew> crewList = crewRepository.findByCompany(company);
        List<CrewInfo> crewInfoList = new ArrayList<>();

        for (Crew crew : crewList) {
            int hourlyRate = contractRepository.findByCrew(crew)
                    .orElseThrow(() -> new NotFoundException("알바생에 해당하는 근로계약서가 없습니다."))
                    .getSalary();

            int salary = hourlyRate * calculateWorkHours(scheduleRepository.findScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(), getEndOfMonth()));
            crewInfoList.add(CrewInfo.from(crew, salary));
        }
        return new CrewListResponse(crewInfoList);

    }

    public int calculateWorkHours(List<Schedule> schedules) {
        int totalHours = 0;
        for (Schedule schedule : schedules) {
            totalHours += schedule.getDurationTime();
        }
        return totalHours;
    }

    public LocalDateTime getStartOfMonth() {
        return LocalDateTime.now().withDayOfMonth(1).with(LocalTime.MIN); // 월의 1일 00:00:00
    }

    public LocalDateTime getEndOfMonth() {
        return LocalDateTime.now().withDayOfMonth(LocalDate.now().lengthOfMonth()).with(LocalTime.MAX); // 월의 마지막 날 23:59:59
    }

    public void saveCrew(CustomUserDetails customUserDetails, CrewSaveRequest crewSaveRequest){
        Crew crew = crewRepository.findByTelAndName(crewSaveRequest.tel(), crewSaveRequest.name()).orElseThrow(()-> new BadRequestException("알바생을 찾을 수 없습니다."));
        if(crew.alreadyHired()) throw new DuplicateException("이미 등록된 알바생입니다.");
        Company company = companyRepository.findByCompanyIdAndBoss_Email(crewSaveRequest.companyId(), customUserDetails.getUsername()).orElseThrow(()->new NotFoundException("사업장을 찾을 수 없습니다."));
        crew.hiredCompany(company);
        crewRepository.save(crew);
    }
}
