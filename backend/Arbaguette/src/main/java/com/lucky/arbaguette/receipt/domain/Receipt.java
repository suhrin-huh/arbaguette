package com.lucky.arbaguette.receipt.domain;

import com.lucky.arbaguette.contract.domain.Contract;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int receiptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contract_id")
    private Contract contract;

    private int month;

    private int originSalary;

    private int tax;

    private int allowance;

    private int totalTime;

    @Builder
    public Receipt(Contract contract, int month, int originSalary, int totalTime) {
        this.contract = contract;
        this.month = month;
        this.originSalary = originSalary;
        this.totalTime = totalTime;
    }

}
