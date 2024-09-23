package com.lucky.arbaguette.boss.dto.request;

public record ReceiptSendRequest(int month,
                                 int originSalary,
                                 int totalTime,
                                 String crewEmail) {
}
