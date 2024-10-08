package com.lucky.arbaguette.bonus.repository;

import com.lucky.arbaguette.bonus.domain.Bonus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BonusRepository extends JpaRepository<Bonus, Integer> {
}
