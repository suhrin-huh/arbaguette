package com.lucky.arbaguette.common.domain.dto;

public record KafkaMsg(int bonusId,
                       String expoPushToken,
                       String accountNo,
                       String userKey,
                       boolean flag) {
}
