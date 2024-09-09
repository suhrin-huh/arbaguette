package com.lucky.arbaguette.common.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.dto.request.UserJoinRequest;
import com.lucky.arbaguette.common.exception.PasswordMismatchException;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

import static com.lucky.arbaguette.common.domain.dto.enums.UserRole.BOSS;
import static com.lucky.arbaguette.common.domain.dto.enums.UserRole.CREW;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final BossRepository bossRepository;
    private final CrewRepository crewRepository;
    private final WebClient webClient; // WebClient 주입

    @Value("${finopenapi.url}")
    private String financialApiUrl;

    @Value("${finopenapi.key}")
    private String financialApiKey;

    public void joinProcess(UserJoinRequest joinRequest) {

        // 아이디 중복 확인
        if (bossRepository.existsByEmail(joinRequest.getEmail()) || crewRepository.existsByEmail(joinRequest.getEmail())) {
            throw new PasswordMismatchException("아이디가 중복되었습니다.");
        }

        // userKey 발급 요청
        Map<String, String> userKeyBody = new HashMap<>();
        userKeyBody.put("userId", joinRequest.getEmail());
        userKeyBody.put("apiKey", financialApiKey);
        System.out.println(joinRequest.getEmail());

        Map<String, Object> responseBody = webClient.post()
                .uri(financialApiUrl + "/v1/member/")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(userKeyBody))
                .retrieve()
                .bodyToMono(Map.class)
                .block();// 결과를 기다림

        log.info("Response Body: {}", responseBody);
        String userKey = responseBody.get("userKey").toString();

        // 계좌 생성 요청
        Map<String, Object> accountRequestBody = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();
        headerMap.put("apiName", "createDemandDepositAccount");
        headerMap.put("transmissionDate", "20240909"); // 실제 날짜와 시간을 넣어야 함
        headerMap.put("transmissionTime", "154000");
        headerMap.put("institutionCode", "00100");
        headerMap.put("fintechAppNo", "001");
        headerMap.put("apiServiceCode", "createDemandDepositAccount");
        headerMap.put("institutionTransactionUniqueNo", "20240909154000000000"); // 유일한 값 필요
        headerMap.put("apiKey", financialApiKey);
        headerMap.put("userKey", userKey);

        accountRequestBody.put("Header", headerMap);
        accountRequestBody.put("accountTypeUniqueNo", "001-1-4ee0c9dcba3e4d");

        // WebClient를 사용한 계좌 생성 요청
        Map<String, Map<String, Object>> accountResponseBody = webClient.post()
                .uri(financialApiUrl + "/v1/edu/demandDeposit/createDemandDepositAccount")
                .body(BodyInserters.fromValue(accountRequestBody))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        Map<String, Object> rec = accountResponseBody.get("REC");
        String account = rec.get("accountNo").toString();

        // 사장님 회원가입
        if (BOSS.equals(joinRequest.getRole())) {
            Boss boss = joinRequest.toBoss(bCryptPasswordEncoder, account, userKey);
            bossRepository.save(boss);
        }

        // 알바생 회원가입
        if (CREW.equals(joinRequest.getRole())) {
            Crew crew = joinRequest.toCrew(bCryptPasswordEncoder, account, userKey);
            crewRepository.save(crew);
        }
    }
}
