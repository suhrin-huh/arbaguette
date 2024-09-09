package com.lucky.arbaguette.crew.repository;

import com.lucky.arbaguette.crew.domain.Crew;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface CrewRepository extends CrudRepository<Crew, Integer> {

    Optional<Crew> findByEmail(String email);
}
