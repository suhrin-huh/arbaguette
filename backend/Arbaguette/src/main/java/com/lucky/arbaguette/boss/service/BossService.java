package com.lucky.arbaguette.boss.service;

import static com.lucky.arbaguette.contract.domain.TaxType.INCOME;
import static com.lucky.arbaguette.contract.domain.TaxType.INSU;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.dto.request.CrewSaveRequest;
import com.lucky.arbaguette.boss.dto.request.ReceiptSendRequest;
import com.lucky.arbaguette.boss.dto.response.CrewSaveResponse;
import com.lucky.arbaguette.boss.dto.response.ExpectedCostResponse;
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
import com.lucky.arbaguette.contractworkingday.domain.dto.WorkingDayInfo;
import com.lucky.arbaguette.contractworkingday.repository.ContractWorkingDayRepository;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.domain.dto.CrewInfo;
import com.lucky.arbaguette.crew.domain.dto.response.CrewDetailResponse;
import com.lucky.arbaguette.crew.domain.dto.response.CrewListResponse;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import com.lucky.arbaguette.receipt.domain.Receipt;
import com.lucky.arbaguette.receipt.domain.dto.ReceiptInfo;
import com.lucky.arbaguette.receipt.repository.ReceiptRepository;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.repository.ScheduleRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class BossService {

    private final float INSU_PERCENT = 0.894f;
    private final float INCOME_PERCENT = 0.967f;

    private final CompanyRepository companyRepository;
    private final CrewRepository crewRepository;
    private final ContractRepository contractRepository;
    private final ScheduleRepository scheduleRepository;
    private final BossRepository bossRepository;
    private final ContractWorkingDayRepository contractWorkingDayRepository;
    private final ReceiptRepository receiptRepository;

    public ExpectedCostResponse getExpectedCost(CustomUserDetails customUserDetails, int companyId) {
        Boss boss = bossRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("해당 사장님을 찾을 수 없습니다."));
        Company company = companyRepository.findByCompanyIdAndBoss(companyId, boss)
                .orElseThrow(() -> new UnAuthorizedException("해당 조회 권한이 없습니다."));

        List<Crew> crewList = crewRepository.findByCompany(company);
        int originSalary = 0;
        int tax = 0;
        int allowance = 0;
        for (Crew crew : crewList) {
            Optional<Contract> contract = contractRepository.findByCrew(crew);
            if (contract.isPresent()) {
                int curAllowance = 0;
                int curTax = 0;
                int curOriginSalary = 0;

                int hourlyRate = contract.get().getSalary();
                int workHours = calculateWorkHours(scheduleRepository.findAllScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(), getEndOfMonth()));
                curOriginSalary = hourlyRate * workHours;

                if (workHours > 80) {
                    curAllowance = (int) (hourlyRate * 1.5 * (workHours - 80));
                }

                if (INSU.equals(contract.get().getTax())) {
                    curTax = (int) ((curOriginSalary + curAllowance) * (1 - INSU_PERCENT));
                    curOriginSalary *= INSU_PERCENT;
                    curAllowance *= INSU_PERCENT;
                }
                if (INCOME.equals(contract.get().getTax())) {
                    curTax = (int) ((curOriginSalary + curAllowance) * (1 - INCOME_PERCENT));
                    curOriginSalary *= INCOME_PERCENT;
                    curAllowance *= INCOME_PERCENT;
                }

                originSalary += curOriginSalary;
                tax += curTax;
                allowance += curAllowance;
            }

        }

        return new ExpectedCostResponse(originSalary, tax, allowance);
    }

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

                int workHours = calculateWorkHours(
                        scheduleRepository.findScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(),
                                getEndOfMonth()));

                int allowance = 0;
                if (workHours > 80) {
                    allowance = (int) (hourlyRate * 1.5 * (workHours - 80));
                }

                salary = hourlyRate * workHours + allowance;

                if (INSU.equals(contract.get().getTax())) {
                    salary *= INSU_PERCENT;
                }
                if (INCOME.equals(contract.get().getTax())) {
                    salary *= INCOME_PERCENT;
                }
            }

            crewInfoList.add(CrewInfo.from(crew, salary));

        }

        return new CrewListResponse(crewInfoList);

    }

    public CrewDetailResponse getCrewDetails(CustomUserDetails customUserDetails, int crewId) {
        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new NotFoundException("해당하는 알바생이 존재하지 않습니다."));

        Contract contract = contractRepository.findByCrew(crew)
                .orElse(null);

        //계약 근무일 & 현재까지의 월급, 근무시간 & 급여명세서 계산 로직
        List<WorkingDayInfo> workingDayInfos = new ArrayList<>();
        List<ReceiptInfo> receiptInfos = new ArrayList<>();
        int salary = 0;
        int tax = 0;
        int allowance = 0;
        int workHours = 0;

        if (contract != null) {
            //계약 근무일
            List<ContractWorkingDay> contractWorkingDays = contractWorkingDayRepository.findAllByContract(contract);
            for (ContractWorkingDay contractWorkingDay : contractWorkingDays) {
                workingDayInfos.add(WorkingDayInfo.to(contractWorkingDay));
            }

            //현재까지 월급, 근무시간, 세금, 수당
            int hourlyRate = contract.getSalary();
            workHours = calculateWorkHours(
                    scheduleRepository.findScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(),
                            getEndOfMonth()));
            salary = hourlyRate * workHours;

            if (workHours > 80) {
                allowance = (int) (hourlyRate * 1.5 * (workHours - 80));
            }

            if (INSU.equals(contract.getTax())) {
                tax = (int) ((salary + allowance) * (1 - INSU_PERCENT));
                salary *= INSU_PERCENT;
                allowance *= INSU_PERCENT;
            }
            if (INCOME.equals(contract.getTax())) {
                tax = (int) ((salary + allowance) * (1 - INCOME_PERCENT));
                salary *= INCOME_PERCENT;
                allowance *= INCOME_PERCENT;
            }

            //급여명세서
            List<Receipt> receipts = receiptRepository.findAllByContract(contract);
            for (Receipt receipt : receipts) {
                receiptInfos.add(ReceiptInfo.to(receipt));
            }

        }

        return CrewDetailResponse.from(crew, workingDayInfos, salary, tax, allowance, workHours, receiptInfos);

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
        return LocalDateTime.now().withDayOfMonth(LocalDate.now().lengthOfMonth())
                .with(LocalTime.MAX); // 월의 마지막 날 23:59:59
    }

    public CrewSaveResponse saveCrew(CustomUserDetails customUserDetails, CrewSaveRequest crewSaveRequest) {
        Crew crew = crewRepository.findByTelAndName(crewSaveRequest.tel(), crewSaveRequest.name())
                .orElseThrow(() -> new BadRequestException("알바생을 찾을 수 없습니다."));
        if (crew.alreadyHired()) {
            throw new DuplicateException("이미 등록된 알바생입니다.");
        }
        Company company = companyRepository.findByCompanyIdAndBoss_Email(crewSaveRequest.companyId(),
                        customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("사업장을 찾을 수 없습니다."));
        crew.hiredCompany(company);
        crewRepository.save(crew);
        return new CrewSaveResponse(crew.getCrewId());
    }

    public void sendReceipt(CustomUserDetails customUserDetails, ReceiptSendRequest receiptSendRequest) {
        Contract contract = contractRepository.findByCrew_CrewId(receiptSendRequest.crewId());

        if (receiptRepository.existsByMonthAndContract(receiptSendRequest.month(), contract)) {
            throw new DuplicateException("이미 발송된 급여명세서입니다.");
        }

        receiptRepository.save(receiptSendRequest.toReceipt(contract));
    }


}
