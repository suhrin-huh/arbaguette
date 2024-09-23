package com.lucky.arbaguette.contractworkingday.repository;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.contractworkingday.domain.ContractWorkingDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractWorkingDayRepository extends JpaRepository<ContractWorkingDay, Integer> {

    List<ContractWorkingDay> findAllByContract(Contract contract);

}
