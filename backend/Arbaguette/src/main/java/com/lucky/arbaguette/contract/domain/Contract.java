package com.lucky.arbaguette.contract.domain;

import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.crew.domain.Crew;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

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

    private LocalDate startDate;

    private LocalDate endDate;

    private int salary;

    private int salaryDate;

    @Enumerated(EnumType.STRING)
    private TaxType tax;

    private String bossSign;

    private String crewSign;

    private String url;

    @Builder
    public Contract(Company company, Crew crew, LocalDate startDate, LocalDate endDate, int salary, int salaryDate, TaxType tax, String bossSign) {
        this.company = company;
        this.crew = crew;
        this.startDate = startDate;
        this.endDate = endDate;
        this.salary = salary;
        this.salaryDate = salaryDate;
        this.tax = tax;
        this.bossSign = bossSign;
    }

    public boolean alreadySigned() {
        return this.crewSign != null;
    }

    public void signCrew(String url) {
        this.crewSign = url;
    }

    public boolean notInWorkingPeriod() {
        LocalDate nowTime = LocalDate.now();
        return ((nowTime.isAfter(this.endDate)) || (nowTime.isBefore(this.startDate)));
    }

    public boolean nowMonthNotInWorkingPeriod(){
        LocalDate nowTime = LocalDate.now();
        return nowTime.getMonth() != this.startDate.getMonth();
    }

}
