package com.lucky.arbaguette.common.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.response.AccountResponse;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class BankService {

    private final BossRepository bossRepository;
    private final CrewRepository crewRepository;
    private final WebClient webClient;

    @Value("${finopenapi.url}")
    private String financialApiUrl;

    @Value("${finopenapi.key}")
    private String financialApiKey;

    public AccountResponse getAccount(CustomUserDetails customUserDetails) {
        String email = customUserDetails.getUsername();
        String account = "";
        String userKey = "";
        if (customUserDetails.isBoss()) {
            Boss boss = bossRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("해당 회원을 찾을 수 없습니다."));
            account = boss.getAccount();
            userKey = boss.getUserKey();
        }
        if (customUserDetails.isCrew()) {
            Crew crew = crewRepository.findByEmail(email)
                    .orElseThrow(() -> new NotFoundException("해당 회원을 찾을 수 없습니다."));
            account = crew.getAccount();
            userKey = crew.getUserKey();
        }

        //"inquireDemandDepositAccountBalance" 시작
        Map<String, Object> accountRequestBody = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();

        Date today = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = formatter.format(today);

        SimpleDateFormat timeFormatter = new SimpleDateFormat("HHmmss");
        String formattedTime = timeFormatter.format(today);

        headerMap.put("apiName", "inquireDemandDepositAccountBalance");
        headerMap.put("transmissionDate", formattedDate);
        headerMap.put("transmissionTime", formattedTime);
        headerMap.put("institutionCode", "00100");
        headerMap.put("fintechAppNo", "001");
        headerMap.put("apiServiceCode", "inquireDemandDepositAccountBalance");
        headerMap.put("institutionTransactionUniqueNo", formattedDate + formattedTime + "000000"); // 유일한 값 필요
        headerMap.put("apiKey", financialApiKey);
        headerMap.put("userKey", userKey);

        accountRequestBody.put("Header", headerMap);
        accountRequestBody.put("accountNo", account);

        Map<String, Map<String, Object>> accountResponseBody = webClient.post()
                .uri(financialApiUrl + "/v1/edu/demandDeposit/inquireDemandDepositAccountBalance")
                .body(BodyInserters.fromValue(accountRequestBody))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        Map<String, Object> rec = accountResponseBody.get("REC");
        String money = rec.get("accountBalance").toString();

        return new AccountResponse(account, money);

    }
}
