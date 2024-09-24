package com.lucky.arbaguette.boss.dto.request;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.receipt.domain.Receipt;

public record ReceiptSendRequest(int month,
                                 int originSalary,
                                 int totalTime,
                                 int crewId) {

    public Receipt toReceipt(Contract contract) {
        return Receipt.builder()
                .contract(contract)
                .month(this.month)
                .originSalary(this.originSalary)
                .totalTime(this.totalTime)
                .build();
    }
}
