package com.lucky.arbaguette.company.dto;

import com.lucky.arbaguette.company.domain.Company;

import java.util.List;

public record CompanyListResponse(
        List<CompanyList> companies
) {

    public static CompanyListResponse of(List<CompanyList> companyList){
        return new CompanyListResponse(companyList);
    }

    public static record CompanyList(
            String name,
            String address
    ) {
        public static CompanyList of(Company company){
            return new CompanyList(company.getName(), company.getAddress());
        }
    }

}
