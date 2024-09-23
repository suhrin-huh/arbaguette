package com.lucky.arbaguette.contract.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lucky.arbaguette.contract.domain.TaxType;
import com.lucky.arbaguette.contractworkingday.domain.dto.WorkingDayInfo;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public record ContractSaveRequest(int companyId,
                                  String name,
                                  String tel,
                                  @JsonFormat(pattern = "yyyy-MM-dd")LocalDateTime startDate,
                                  @JsonFormat(pattern = "yyyy-MM-dd")LocalDateTime endDate,
                                  List<WorkingDayInfo> workingDayInfoList,
                                  int salary,
                                  TaxType taxType,
                                  MultipartFile multipartFile
                                  ) {
}
