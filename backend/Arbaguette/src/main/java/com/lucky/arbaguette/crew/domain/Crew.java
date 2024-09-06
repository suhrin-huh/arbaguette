package com.lucky.arbaguette.crew.domain;

import com.lucky.arbaguette.company.domain.Company;
import jakarta.persistence.*;
import lombok.AccessLevel;
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
    @JoinColumn(name = "comapny_id")
    private Company company;

    private String name;

    private String email;

    private String password;

    private String tel;

    private String account;

    private String userKey;

    private int profileImage;
}
