package com.lucky.bonus;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClickRepository extends JpaRepository<Click, Integer> {

    Optional<Click> findByBonusIdAndAccountNo(int bonusId, String accountNo);

    List<Click> findAllByBonusId(int bonusId);
}
