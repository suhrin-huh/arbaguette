package com.lucky.arbaguette.common.domain.dto.request;

public record SendMoneyRequest(String account,
                               String money,
                               String password) {

    public static SendMoneyRequest from(String account, BluetoothSendMoneyRequest bluetoothSendMoneyRequest) {
        return new SendMoneyRequest(
                account,
                bluetoothSendMoneyRequest.money(),
                bluetoothSendMoneyRequest.password()
        );
    }
}
