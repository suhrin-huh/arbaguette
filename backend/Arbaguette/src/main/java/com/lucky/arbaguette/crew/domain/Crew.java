package com.lucky.arbaguette.crew.domain;

import static com.lucky.arbaguette.common.domain.enums.CrewStatus.SIGNED;
import static com.lucky.arbaguette.common.domain.enums.CrewStatus.UNREGISTERED;
import static com.lucky.arbaguette.common.domain.enums.CrewStatus.UNSIGNED;

import com.lucky.arbaguette.common.domain.enums.CrewStatus;
import com.lucky.arbaguette.company.domain.Company;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Crew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int crewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    private String name;

    private String email;

    private String password;

    private String tel;

    private String account;

    private String userKey;

    private String profileImage;

    private String accountPassword;

    private String bluetoothToken;

    @Enumerated(EnumType.STRING)
    private CrewStatus crewStatus = UNREGISTERED;

    @Builder
    public Crew(String name, String email, String password, String tel, String account, String userKey,
                String profileImage, String accountPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tel = tel;
        this.account = account;
        this.userKey = userKey;
        this.profileImage = profileImage;
        this.accountPassword = accountPassword;
    }

    public boolean alreadyHired() {
        return this.company != null;
    }

    public void hiredCompany(Company company) {
        this.company = company;
        this.crewStatus = UNSIGNED;
    }

    public void signComplete() {
        this.crewStatus = SIGNED;
    }

    public void cancelCompany() {
        this.company = null;
        this.crewStatus = UNREGISTERED;
    }

    public void saveBluetoothId(String bluetoothToken) {
        this.bluetoothToken = bluetoothToken;
    }
}
