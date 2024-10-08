package com.lucky.arbaguette.common.domain.dto.request;

public record BluetoothSendMoneyRequest(String bluetoothToken,
                                        String money,
                                        String password) {

}
