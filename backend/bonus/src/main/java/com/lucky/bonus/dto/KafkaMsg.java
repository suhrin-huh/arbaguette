package com.lucky.bonus.dto;

public record KafkaMsg(int bonusId,
                       String accountNo,
                       String userKey,
                       boolean flag) {
}
