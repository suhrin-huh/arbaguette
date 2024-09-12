package com.lucky.arbaguette.company.dto;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.company.domain.Company;

public record CompanyInfo(String name, String address, String representative) {

    public Company toCompany(Boss boss){
        return Company.builder()
                .boss(boss)
                .name(this.name)
                .address(this.address)
                .representative(this.representative)
                .build();
    }
}
