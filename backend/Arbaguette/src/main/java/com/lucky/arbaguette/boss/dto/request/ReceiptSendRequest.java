package com.lucky.arbaguette.boss.dto.request;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.receipt.domain.Receipt;

public record ReceiptSendRequest(int month,
                                 int originSalary,
                                 int tax,
                                 int allowance,
                                 int totalTime,
                                 int crewId) {

    public Receipt toReceipt(Contract contract) {
        return Receipt.builder()
                .contract(contract)
                .month(this.month)
                .originSalary(this.originSalary)
                .tax(this.tax)
                .allowance(this.allowance)
                .totalTime(this.totalTime)
                .build();
    }
}
