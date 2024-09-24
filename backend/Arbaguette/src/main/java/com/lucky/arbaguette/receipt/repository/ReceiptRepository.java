package com.lucky.arbaguette.receipt.repository;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.receipt.domain.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {

    List<Receipt> findAllByContract(Contract contract);

    boolean existsByMonthAndContract(int month, Contract contract);

    Optional<Receipt> findByMonthAndContract(int month, Contract contract);

}
