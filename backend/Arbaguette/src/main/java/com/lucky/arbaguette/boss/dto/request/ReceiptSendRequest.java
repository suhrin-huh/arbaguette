package com.lucky.arbaguette.boss.dto.request;

public record ReciptSendRequest(int month,
                                int originSalary,
                                int totalTime,
                                String crewEmail) {
}
