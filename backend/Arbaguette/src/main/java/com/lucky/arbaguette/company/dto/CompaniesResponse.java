package com.lucky.arbaguette.company.dto;

import java.util.List;

public record CompaniesResponse(
        List<CompanyInfo> companies
) {

    public static CompaniesResponse of(List<CompanyInfo> companies){
        return new CompaniesResponse(companies);
    }

}
