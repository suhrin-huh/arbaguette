package com.lucky.arbaguette.contractworkingday.domain;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractWorkingDayId implements Serializable {
    private int contractId;
    private int weekday;

    public ContractWorkingDayId(int contractId, int weekday) {
        this.contractId = contractId;
        this.weekday = weekday;
    }
}
