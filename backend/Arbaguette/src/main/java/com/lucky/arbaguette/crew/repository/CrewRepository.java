package com.lucky.arbaguette.crew.repository;

import com.lucky.arbaguette.crew.domain.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Integer> {

    public boolean existsByEmail(String email);
}
