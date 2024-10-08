package com.lucky.arbaguette.common.domain.dto.response;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.crew.domain.Crew;
import java.util.List;

public record BluetoothInfosResponse(List<BluetoothInfo> infos) {

    public static BluetoothInfosResponse from(List<Crew> crews) {
        return new BluetoothInfosResponse(
                crews.stream()
                        .map(crew -> new BluetoothInfo(
                                crew.getProfileImage(),
                                crew.getName(),
                                crew.getBluetoothToken(),
                                crew.getCompany().getCompanyId()
                        ))
                        .toList()
        );
    }

    public static BluetoothInfosResponse from(List<Crew> crews, Boss boss) {
        List<BluetoothInfo> infos = new java.util.ArrayList<>(crews.stream()
                .map(crew -> new BluetoothInfo(
                        crew.getProfileImage(),
                        crew.getName(),
                        crew.getBluetoothToken(),
                        crew.getCompany().getCompanyId()
                ))
                .toList());
        
        infos.add(new BluetoothInfo(
                boss.getProfileImage(),
                boss.getName(),
                boss.getBluetoothToken(),
                crews.get(0).getCompany().getCompanyId()
        ));
        return new BluetoothInfosResponse(infos);
    }

    public record BluetoothInfo(String image,
                                String name,
                                String bluetoothToken,
                                int companyId) {

    }
}
