package com.lucky.arbaguette.contractworkingday.domain;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ContractWorkingDayId that = (ContractWorkingDayId) o;
        return contractId == that.contractId && weekday == that.weekday;
    }

    @Override
    public int hashCode() {
        return Objects.hash(contractId, weekday);
    }

}
