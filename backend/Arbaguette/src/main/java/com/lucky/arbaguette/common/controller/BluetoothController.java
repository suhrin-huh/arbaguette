package com.lucky.arbaguette.common.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.BluetoothSaveRequest;
import com.lucky.arbaguette.common.domain.dto.request.BluetoothSendMoneyRequest;
import com.lucky.arbaguette.common.domain.dto.response.BluetoothInfosResponse;
import com.lucky.arbaguette.common.service.BluetoothService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bluetooth")
public class BluetoothController {

    private final BluetoothService bluetoothService;

    @PostMapping
    public ApiResponse<Void> saveBluetooth(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                           @RequestBody BluetoothSaveRequest request) {
        bluetoothService.saveBluetooth(customUserDetails, request);
        return ApiResponse.success();
    }

    @PostMapping("/send")
    public ApiResponse<Void> sendMoneyWithBluetooth(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                    @RequestBody BluetoothSendMoneyRequest request) {
        bluetoothService.sendMoneyWithBluetooth(customUserDetails, request);
        return ApiResponse.success();
    }

    @GetMapping
    public ApiResponse<BluetoothInfosResponse> getBluetoothInfos(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(bluetoothService.getBluetoothInfos(customUserDetails));
    }
}
