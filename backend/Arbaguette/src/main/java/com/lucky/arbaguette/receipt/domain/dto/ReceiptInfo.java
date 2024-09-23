package com.lucky.arbaguette.receipt.domain.dto;

import com.lucky.arbaguette.receipt.domain.Receipt;

public record ReceiptInfo(int month,
                          int originSalary,
                          int totalTime) {

    public static ReceiptInfo to(Receipt receipt) {
        return new ReceiptInfo(receipt.getMonth(),
                receipt.getOriginSalary(),
                receipt.getTotalTime());
    }

}
