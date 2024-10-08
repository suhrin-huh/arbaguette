package com.lucky.arbaguette.common.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.BluetoothSaveRequest;
import com.lucky.arbaguette.common.domain.dto.request.BluetoothSendMoneyRequest;
import com.lucky.arbaguette.common.domain.dto.request.SendMoneyRequest;
import com.lucky.arbaguette.common.domain.dto.response.BluetoothInfosResponse;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.company.repository.CompanyRepository;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BluetoothService {

    private final BossRepository bossRepository;
    private final CrewRepository crewRepository;
    private final CompanyRepository companyRepository;
    private final BankService bankService;

    @Transactional
    public void saveBluetooth(CustomUserDetails customUserDetails, BluetoothSaveRequest request) {
        if (customUserDetails.isBoss()) {
            bossRepository.findByEmail(customUserDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("사장님을 찾을 수 없습니다."))
                    .saveBluetoothId(request.bluetoothToken());
            return;
        }

        crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."))
                .saveBluetoothId(request.bluetoothToken());
    }

    public void sendMoneyWithBluetooth(CustomUserDetails customUserDetails, BluetoothSendMoneyRequest request) {
        String account = bossRepository.findByBluetoothToken(request.bluetoothToken())
                .map(Boss::getAccount)
                .orElseGet(() -> crewRepository.findByBluetoothToken(request.bluetoothToken())
                        .map(Crew::getAccount)
                        .orElseThrow(() -> new NotFoundException("상대방을 찾을 수 없습니다.")));

        bankService.sendMoney(customUserDetails, SendMoneyRequest.from(account, request));
    }

    public BluetoothInfosResponse getBluetoothInfos(CustomUserDetails customUserDetails) {
        if (customUserDetails.isBoss()) {
            List<Company> companies = companyRepository.findAllByBoss_Email(customUserDetails.getUsername());

            return BluetoothInfosResponse.from(
                    companies.stream()
                            .flatMap(company -> crewRepository.findByCompany(company).stream())
                            .toList()
            );
        }

        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        if (crew.getCompany() == null) {
            return BluetoothInfosResponse.from(new ArrayList<>());
        }
        
        List<Crew> crews = crewRepository.findByCompany(crew.getCompany());
        Boss boss = companyRepository.findById(crew.getCompany().getCompanyId())
                .orElseThrow(() -> new NotFoundException("회사를 찾을 수 없습니다.")).getBoss();

        return BluetoothInfosResponse.from(crews, boss);
    }
}
