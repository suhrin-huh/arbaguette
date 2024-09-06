package com.lucky.arbaguette.contract.domain;

import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.crew.domain.Crew;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contractId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Company company;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private int salary;

    private int salaryDate;

    @Enumerated(EnumType.STRING)
    private TaxType tax;

    private String bossSign;

    private String crewSign;

}
