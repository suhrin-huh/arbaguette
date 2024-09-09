package com.lucky.arbaguette.boss.repository;


import com.lucky.arbaguette.boss.domain.Boss;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BossRepository extends JpaRepository<Boss, Integer> {

    public boolean existsByEmail(String email);
}
