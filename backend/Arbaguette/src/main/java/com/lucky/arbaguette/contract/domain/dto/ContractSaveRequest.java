package com.lucky.arbaguette.contract.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.contract.domain.TaxType;
import com.lucky.arbaguette.contractworkingday.domain.dto.WorkingDayInfo;
import com.lucky.arbaguette.crew.domain.Crew;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public record ContractSaveRequest(int companyId,
                                  int crewId,
                                  @JsonFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                  @JsonFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
                                  List<WorkingDayInfo> workingDayInfoList,
                                  int salary,
                                  int salaryDate,
                                  TaxType taxType
                                  ) {

    public Contract toContract(Company company, Crew crew, String url) throws IOException {
        return Contract.builder()
                .company(company)
                .crew(crew)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .salary(this.salary)
                .salaryDate(this.salaryDate)
                .tax(this.taxType)
                .bossSign(url)
                .build();
    }

}
