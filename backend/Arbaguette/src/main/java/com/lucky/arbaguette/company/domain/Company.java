package com.lucky.arbaguette.company.domain;

import com.lucky.arbaguette.boss.domain.Boss;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import lombok.Builder;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int companyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "boss_id")
    private Boss boss;

    private String name;

    private String address;

    private String representative;

    @Builder
    public Company(Boss boss, String name, String address, String representative){
        this.boss = boss;
        this.name = name;
        this.address = address;
        this.representative = representative;
    }

}
