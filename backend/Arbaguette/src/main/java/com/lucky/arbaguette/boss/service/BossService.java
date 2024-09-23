package com.lucky.arbaguette.boss.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.dto.CrewSaveRequest;
import com.lucky.arbaguette.boss.dto.ReciptSendRequest;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.DuplicateException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.common.exception.UnAuthorizedException;
import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.company.repository.CompanyRepository;
import com.lucky.arbaguette.contract.Repository.ContractRepository;
import com.lucky.arbaguette.contract.domain.Contract;
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
import java.util.Optional;

import static com.lucky.arbaguette.contract.domain.TaxType.INCOME;
import static com.lucky.arbaguette.contract.domain.TaxType.INSU;

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
            int salary = 0;
            Optional<Contract> contract = contractRepository.findByCrew(crew);
            if (contract.isPresent()) {
                int hourlyRate = contract.get().getSalary();
                salary = hourlyRate * calculateWorkHours(scheduleRepository.findScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(), getEndOfMonth()));
                if (INSU.equals(contract.get().getTax())) {
                    salary *= 0.967;
                }
                if (INCOME.equals(contract.get().getTax())) {
                    salary *= 0.896;
                }
            }

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

    public void saveCrew(CustomUserDetails customUserDetails, CrewSaveRequest crewSaveRequest) {
        Crew crew = crewRepository.findByTelAndName(crewSaveRequest.tel(), crewSaveRequest.name())
                .orElseThrow(() -> new BadRequestException("알바생을 찾을 수 없습니다."));
        if (crew.alreadyHired()) {
            throw new DuplicateException("이미 등록된 알바생입니다.");
        }
        Company company = companyRepository.findByCompanyIdAndBoss_Email(crewSaveRequest.companyId(), customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("사업장을 찾을 수 없습니다."));
        crew.hiredCompany(company);
        crewRepository.save(crew);
    }

    public void sendReceipt(CustomUserDetails customUserDetails, ReciptSendRequest reciptSendRequest) {

    }

}
