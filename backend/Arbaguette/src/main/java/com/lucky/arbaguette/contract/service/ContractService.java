package com.lucky.arbaguette.contract.service;

import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.DuplicateException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.common.exception.UnAuthorizedException;
import com.lucky.arbaguette.common.util.S3Util;
import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.company.repository.CompanyRepository;
import com.lucky.arbaguette.contract.Repository.ContractRepository;
import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.contract.domain.dto.ContractInfo;
import com.lucky.arbaguette.contract.domain.dto.ContractSaveRequest;
import com.lucky.arbaguette.contractworkingday.domain.ContractWorkingDay;
import com.lucky.arbaguette.contractworkingday.domain.dto.WorkingDayInfo;
import com.lucky.arbaguette.contractworkingday.repository.ContractWorkingDayRepository;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ContractService {

    private final CompanyRepository companyRepository;
    private final CrewRepository crewRepository;
    private final ContractRepository contractRepository;
    private final ContractWorkingDayRepository contractWorkingDayRepository;
    private final S3Util s3Util;

    @Transactional
    public void saveContract(CustomUserDetails customUserDetails, ContractSaveRequest contractSaveRequest,
                             MultipartFile file) throws IOException {
        Company company = companyRepository.findByCompanyIdAndBoss_Email(contractSaveRequest.companyId(),
                customUserDetails.getUsername()).orElseThrow(() -> new UnAuthorizedException("사업장을 찾을 수 없습니다."));
        Crew crew = crewRepository.findById(contractSaveRequest.crewId())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."));
        if (file.isEmpty()) {
            throw new BadRequestException("서명이 비었습니다.");
        }
        Contract contract = contractSaveRequest.toContract(company, crew, s3Util.upload(file));
        contractRepository.save(contract);

        //근로계약서에 따라 근무계약일 생성
        contractSaveRequest.workingDayInfoList().forEach(workingDayInfo -> {
            ContractWorkingDay contractWorkingDay = createContractWorkingDay(contract, workingDayInfo);
            contractWorkingDayRepository.save(contractWorkingDay);
        });
    }

    private ContractWorkingDay createContractWorkingDay(Contract contract, WorkingDayInfo workingDayInfo) {
        if (contractWorkingDayRepository.existsByContractAndId_Weekday(contract, workingDayInfo.weekday())) {
            throw new DuplicateException("근무요일이 겹칩니다.");
        }
        return ContractWorkingDay.builder()
                .contract(contract)
                .startTime(workingDayInfo.startTime())
                .endTime(workingDayInfo.endTime())
                .weekday(workingDayInfo.weekday())
                .build();
    }

    public void signCrewContract(CustomUserDetails customUserDetails, MultipartFile file) throws IOException {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new UnAuthorizedException("알바생을 찾을 수 없습니다."));
        Contract contract = contractRepository.findByCrew(crew)
                .orElseThrow(() -> new NotFoundException("근로계약서를 찾을 수 없습니다."));
        if (contract.alreadySigned()) {
            throw new DuplicateException("이미 서명했습니다.");
        }
        if (file.isEmpty()) {
            throw new BadRequestException("서명이 비었습니다.");
        }
        contract.signCrew(s3Util.upload(file));
        //알바생 상태 변경, UNSIGNED->SINGED
        crew.signComplete();
        crewRepository.save(crew);
        contractRepository.save(contract);
    }

    public ContractInfo getContract(CustomUserDetails customUserDetails, int crewId) {
        Crew crew = crewRepository.findById(crewId).orElseThrow(() -> new BadRequestException("알바생을 찾을 수 없습니다."));
        Contract contract = contractRepository.findByCrew(crew).orElseThrow(() -> new NotFoundException("근로계약서를 찾을 수 없습니다."));
        List<WorkingDayInfo> workingDayInfos = contractWorkingDayRepository.findAllByContract(contract).stream()
                .map(WorkingDayInfo::to)
                .toList();
        return ContractInfo.from(crew.getCompany(), crew, contract, workingDayInfos);
    }

}
