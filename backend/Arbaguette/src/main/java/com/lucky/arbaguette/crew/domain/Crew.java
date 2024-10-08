package com.lucky.arbaguette.crew.domain;

import com.lucky.arbaguette.common.domain.enums.CrewStatus;
import com.lucky.arbaguette.company.domain.Company;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.lucky.arbaguette.common.domain.enums.CrewStatus.*;

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

    private String expoPushToken;

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

    public void saveExpoPushToken(String expoPushToken) {
        this.expoPushToken = expoPushToken;
    }
}
