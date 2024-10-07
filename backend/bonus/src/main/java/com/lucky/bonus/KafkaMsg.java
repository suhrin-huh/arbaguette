package com.lucky.bonus;

public record KafkaMsg(int bonusId,
                       String accountNo,
                       String userKey,
                       boolean flag) {
}
