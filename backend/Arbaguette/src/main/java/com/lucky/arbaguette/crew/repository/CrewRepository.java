package com.lucky.arbaguette.crew.repository;

import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.crew.domain.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CrewRepository extends JpaRepository<Crew, Integer> {

    boolean existsByEmail(String email);

    Optional<Crew> findByEmail(String email);

    List<Crew> findByCompany(Company company);

}
