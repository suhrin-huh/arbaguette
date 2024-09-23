package com.lucky.arbaguette.receipt.repository;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.receipt.domain.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {

    List<Receipt> findAllByContract(Contract contract);

}
