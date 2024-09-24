package com.lucky.arbaguette.receipt.domain.dto.response;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.receipt.domain.Receipt;

public record ReceiptDetailsResponse(int originSalary,
                                     int tax,
                                     int waterSugar,
                                     int totalTime,
                                     String companyName,
                                     int salaryDate) {

    public static ReceiptDetailsResponse from(Receipt receipt, Contract contract) {
        return new ReceiptDetailsResponse(
                receipt.getOriginSalary(),
                receipt.getTax(),
                receipt.getAllowance(),
                receipt.getTotalTime(),
                contract.getCompany().getName(),
                contract.getSalaryDate()
        );
    }
}
