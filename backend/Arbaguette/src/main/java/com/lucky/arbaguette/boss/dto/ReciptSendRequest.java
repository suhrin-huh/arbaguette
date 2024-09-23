package com.lucky.arbaguette.boss.dto;

public record ReciptSendRequest(int month,
                                int originSalary,
                                int totalTime,
                                String crewEmail) {
}
