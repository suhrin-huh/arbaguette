package com.lucky.arbaguette.contractworkingday.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lucky.arbaguette.contract.domain.Contract;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContractWorkingDay {

    @EmbeddedId
    private ContractWorkingDayId id;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @MapsId("weekday")
    private int weekday;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "contract_id")
    @MapsId("contractId")
    private Contract contract;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime startDate;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime endDate;

}
