package com.lucky.arbaguette.crew.domain.dto.response;

import com.lucky.arbaguette.contractworkingday.domain.dto.WorkingDayInfo;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.receipt.domain.dto.ReceiptInfo;

import java.util.List;

public record CrewDetailResponse(int id,
                                 String name,
                                 String tel,
                                 String profileImage,
                                 List<WorkingDayInfo> workingDays,
                                 int salary,
                                 int tax,
                                 int allowance,
                                 int workHours,
                                 List<ReceiptInfo> receipts) {

    public static CrewDetailResponse from(Crew crew, List<WorkingDayInfo> workingDayInfos, int salary, int tax, int allowance, int workHours, List<ReceiptInfo> receipts) {
        return new CrewDetailResponse(crew.getCrewId(),
                crew.getName(),
                crew.getTel(),
                crew.getProfileImage(),
                workingDayInfos,
                salary,
                tax,
                allowance,
                workHours,
                receipts);
    }

}
