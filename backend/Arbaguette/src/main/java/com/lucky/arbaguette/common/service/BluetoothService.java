package com.lucky.arbaguette.common.service;

import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.BluetoothSaveRequest;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BluetoothService {

    private final BossRepository bossRepository;
    private final CrewRepository crewRepository;

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
}
