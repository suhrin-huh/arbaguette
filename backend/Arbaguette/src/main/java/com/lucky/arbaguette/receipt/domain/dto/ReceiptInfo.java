package com.lucky.arbaguette.receipt.domain.dto;

import com.lucky.arbaguette.receipt.domain.Receipt;

public record ReceiptInfo(int month,
                          int salary,
                          int tax,
                          int allowance,
                          int totalTime) {

    public static ReceiptInfo to(Receipt receipt) {
        return new ReceiptInfo(receipt.getMonth(),
                receipt.getOriginSalary(),
                receipt.getTax(),
                receipt.getAllowance(),
                receipt.getTotalTime());
    }

}
