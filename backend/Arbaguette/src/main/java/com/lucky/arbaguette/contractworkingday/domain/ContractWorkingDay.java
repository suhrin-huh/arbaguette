package com.lucky.arbaguette.contractworkingday.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lucky.arbaguette.contract.domain.Contract;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractWorkingDay {

    @EmbeddedId
    private ContractWorkingDayId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "contract_id")
    @MapsId("contractId")
    private Contract contract;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

    @Builder
    public ContractWorkingDay(Contract contract, LocalTime startTime, LocalTime endTime, int weekday){
        this.id = new ContractWorkingDayId(contract.getContractId(), weekday);
        this.contract = contract;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}
