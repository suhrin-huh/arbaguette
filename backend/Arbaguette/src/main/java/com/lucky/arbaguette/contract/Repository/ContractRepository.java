package com.lucky.arbaguette.contract.Repository;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.crew.domain.Crew;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Integer> {

    Optional<Contract> findByCrew(Crew crew);

    Optional<Contract> findByCrew_Email(String email);

}
