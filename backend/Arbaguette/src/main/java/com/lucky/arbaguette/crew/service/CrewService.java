package com.lucky.arbaguette.crew.service;

import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.contract.Repository.ContractRepository;
import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import com.lucky.arbaguette.receipt.domain.Receipt;
import com.lucky.arbaguette.receipt.domain.dto.response.ReceiptDetailsResponse;
import com.lucky.arbaguette.receipt.repository.ReceiptRepository;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import static com.lucky.arbaguette.contract.domain.TaxType.INCOME;
import static com.lucky.arbaguette.contract.domain.TaxType.INSU;

@Service
@RequiredArgsConstructor
@Slf4j
public class CrewService {

    private final float INSU_PERCENT = 0.894f;
    private final float INCOME_PERCENT = 0.967f;

    private final CrewRepository crewRepository;
    private final ContractRepository contractRepository;
    private final ScheduleRepository scheduleRepository;
    private final ReceiptRepository receiptRepository;

    public int getNusumSalary(CustomUserDetails customUserDetails) {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."));

        int hourlyRate = contractRepository.findByCrew(crew)
                .orElseThrow(() -> new NotFoundException("알바생에 해당하는 근로계약서가 없습니다."))
                .getSalary();

        int salary = hourlyRate * calculateWorkHours(scheduleRepository.findScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(), getEndOfMonth()));

        return salary;

    }

    public int getExpectedSalary(CustomUserDetails customUserDetails) {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."));

        int salary = 0;
        Contract contract = contractRepository.findByCrew(crew)
                .orElse(null);

        if (contract != null) {
            int hourlyRate = contract.getSalary();
            int workHours = calculateWorkHours(scheduleRepository.findAllScheduleByCrewAndMonth(crew.getCrewId(), getStartOfMonth(), getEndOfMonth()));
            salary = hourlyRate * workHours;

            if (workHours > 80) {
                salary += (int) (hourlyRate * 1.5 * (workHours - 80));
            }
            if (INSU.equals(contract.getTax())) {
                salary *= INSU_PERCENT;
            }
            if (INCOME.equals(contract.getTax())) {
                salary *= INCOME_PERCENT;
            }

        }
        
        return salary;
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

    public ReceiptDetailsResponse getReceipt(CustomUserDetails customUserDetails, int month) {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("해당하는 알바생이 존재하지않습니다."));

        Contract contract = contractRepository.findByCrew(crew)
                .orElseThrow(() -> new NotFoundException("해당하는 근로계약서가 존재하지않습니다."));
        Receipt receipt = receiptRepository.findByMonthAndContract(month, contract)
                .orElseThrow(() -> new NotFoundException("해당하는 급여명세서가 존재하지않습니다."));

        return ReceiptDetailsResponse.from(receipt, contract);

    }
}
