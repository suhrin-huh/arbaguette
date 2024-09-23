package com.lucky.arbaguette.contract.service;

import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.util.S3Util;
import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.contract.domain.dto.ContractSaveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ContractService {

    private final S3Util s3Util;

    public void saveContract(CustomUserDetails customUserDetails, ContractSaveRequest contractSaveRequest){

    }
}
