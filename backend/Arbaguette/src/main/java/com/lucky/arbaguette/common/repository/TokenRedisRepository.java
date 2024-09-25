package com.lucky.arbaguette.common.repository;

import com.lucky.arbaguette.common.domain.TokenRedis;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TokenRedisRepository {

    @Value("${token.refresh.expired.time}")
    private long refreshTokenExpiredTime;

    private static final String TOKEN_PREFIX = "RT:";   //refreshToken

    private final RedisTemplate<String, TokenRedis> redisTemplate;

    public String save(TokenRedis token) {
        String key = TOKEN_PREFIX + token.getEmail();

        redisTemplate.opsForList().rightPush(key, token);
        redisTemplate.expire(key, refreshTokenExpiredTime, TimeUnit.MILLISECONDS);
        return token.getEmail();
    }

    public boolean existsBy(String email) {
        String key = TOKEN_PREFIX + email;
        Long size = redisTemplate.opsForList().size(key);
        return size != null && size > 0;
    }

    public void deleteBy(String email) {
        String key = TOKEN_PREFIX + email;
        redisTemplate.delete(key);
    }
}
