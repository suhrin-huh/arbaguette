package com.lucky.arbaguette.company.dto;

import com.lucky.arbaguette.company.domain.Company;

import java.util.List;

public record CompanyListResponse(List<CompanyList> companies) {

    public static CompanyListResponse of(List<CompanyList> companies){
        return new CompanyListResponse(companies);
    }

    public record CompanyList(int companyId,
                              String name,
                              String address) {

        public static CompanyList of(Company company){
            return new CompanyList(company.getCompanyId(), company.getName(), company.getAddress());
        }
    }
}