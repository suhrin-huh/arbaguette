package com.lucky.arbaguette.boss.repository;

import com.lucky.arbaguette.boss.domain.Boss;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BossRepository extends JpaRepository<Boss, Integer> {

    Optional<Boss> findByEmail(String email);
}
