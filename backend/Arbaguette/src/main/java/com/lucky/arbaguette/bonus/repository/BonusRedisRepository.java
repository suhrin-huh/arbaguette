package com.lucky.arbaguette.bonus.repository;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class BonusRedisRepository {

    @Value("${token.access.expired.time}")
    private long eventExpiredTime;

    private final RedisTemplate<String, Integer> redisTemplate;

    public void save(int bonusId, int clickCnt) {
        redisTemplate.opsForList().rightPush(String.valueOf(bonusId), clickCnt);
        redisTemplate.expire(String.valueOf(bonusId), eventExpiredTime, TimeUnit.MILLISECONDS);
    }

    public long decrement(int bonusId) {
        return redisTemplate.opsForValue().decrement(String.valueOf(bonusId));
    }

}
