package com.lucky.arbaguette.substitute.repository;

import com.lucky.arbaguette.substitute.domain.Substitute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubstituteRepository extends JpaRepository<Substitute, Integer> {
}
