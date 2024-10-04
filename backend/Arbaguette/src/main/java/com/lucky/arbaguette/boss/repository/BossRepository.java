package com.lucky.arbaguette.boss.repository;

import com.lucky.arbaguette.boss.domain.Boss;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BossRepository extends JpaRepository<Boss, Integer> {

    Optional<Boss> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByTel(String tel);

    Optional<Boss> findByAccount(String account);

}
