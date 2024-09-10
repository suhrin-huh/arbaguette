package com.lucky.arbaguette.boss.repository;

import java.util.Optional;
import com.lucky.arbaguette.boss.domain.Boss;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BossRepository extends JpaRepository<Boss, Integer> {

    Optional<Boss> findByEmail(String email);

    public boolean existsByEmail(String email);
    
}
