package com.lucky.arbaguette.common.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.SendMoneyRequest;
import com.lucky.arbaguette.common.domain.dto.request.SendSalaryRequest;
import com.lucky.arbaguette.common.domain.dto.response.AccountResponse;
import com.lucky.arbaguette.common.domain.dto.response.SendDetailResponse;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.common.exception.UnAuthorizedException;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class BankService {

    private final BossRepository bossRepository;
    private final CrewRepository crewRepository;
    private final WebClient webClient;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final NotificationService notificationService;


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

    public Map<String, Object> getHistory(CustomUserDetails customUserDetails) {
        String email = customUserDetails.getUsername();
        String userKey = "";
        String account = "";
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

        //"inquireTransactionHistoryList" 시작
        Map<String, Object> accountRequestBody = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();

        Date today = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = formatter.format(today);

        SimpleDateFormat timeFormatter = new SimpleDateFormat("HHmmss");
        String formattedTime = timeFormatter.format(today);

        headerMap.put("apiName", "inquireTransactionHistoryList");
        headerMap.put("transmissionDate", formattedDate);
        headerMap.put("transmissionTime", formattedTime);
        headerMap.put("institutionCode", "00100");
        headerMap.put("fintechAppNo", "001");
        headerMap.put("apiServiceCode", "inquireTransactionHistoryList");
        headerMap.put("institutionTransactionUniqueNo", formattedDate + formattedTime + "000000"); // 유일한 값 필요
        headerMap.put("apiKey", financialApiKey);
        headerMap.put("userKey", userKey);

        accountRequestBody.put("Header", headerMap);
        accountRequestBody.put("accountNo", account);
        accountRequestBody.put("startDate", "20240901");
        accountRequestBody.put("endDate", "20241030");
        accountRequestBody.put("transactionType", "A");
        accountRequestBody.put("orderByType", "DESC");

        Map<String, Map<String, Object>> accountResponseBody = webClient.post()
                .uri(financialApiUrl + "/v1/edu/demandDeposit/inquireTransactionHistoryList")
                .body(BodyInserters.fromValue(accountRequestBody))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        return accountResponseBody.get("REC");

    }

    public SendDetailResponse getSendDetails(String account) {
        if (bossRepository.existsByAccount(account)) {
            return new SendDetailResponse(bossRepository.findByAccount(account)
                    .orElseThrow(() -> new NotFoundException("해당계좌의 회원이 없습니다."))
                    .getName());
        } else {
            return new SendDetailResponse(crewRepository.findByAccount(account)
                    .orElseThrow(() -> new NotFoundException("해당계좌의 회원이 없습니다."))
                    .getName());
        }

    }

    public void sendMoney(CustomUserDetails customUserDetails, SendMoneyRequest request) {
        String email = customUserDetails.getUsername();
        String userKey = "";
        String account = "";
        String sender = "";
        String senderToken = "";
        String senderUrl = "";
        String receiver = "";
        String receiverToken = "";
        String receiverUrl = "";

        if (customUserDetails.isBoss()) {
            Boss boss = bossRepository.findByEmail(email)
                    .orElseThrow(() -> new UnAuthorizedException("해당 회원을 찾을 수 없습니다."));
            if (!bCryptPasswordEncoder.matches(request.password(), boss.getAccountPassword())) {
                throw new BadRequestException("계좌 비밀번호가 틀렸습니다.");
            }
            senderToken = boss.getExpoPushToken();
            senderUrl = "arbaguette://boss/banking/transaction";
            account = boss.getAccount();
            userKey = boss.getUserKey();
            sender = boss.getName();
        }
        if (customUserDetails.isCrew()) {
            Crew crew = crewRepository.findByEmail(email)
                    .orElseThrow(() -> new UnAuthorizedException("해당 회원을 찾을 수 없습니다."));
            if (!bCryptPasswordEncoder.matches(request.password(), crew.getAccountPassword())) {
                throw new BadRequestException("계좌 비밀번호가 틀렸습니다.");
            }
            senderToken = crew.getExpoPushToken();
            senderUrl = "arbaguette://crew/authorized/banking/transaction";
            account = crew.getAccount();
            userKey = crew.getUserKey();
            sender = crew.getName();
        }

        if (crewRepository.existsByAccount(account)) {
            Crew crew = crewRepository.findByAccount(request.account()).get();
            receiver = crew.getName();
            receiverToken = crew.getExpoPushToken();
            receiverUrl = "arbaguette://crew/authorized/banking/transaction";
        } else {
            Boss boss = bossRepository.findByAccount(request.account()).get();
            receiver = boss.getName();
            receiverToken = boss.getExpoPushToken();
            receiverUrl = "arbaguette://boss/banking/transaction";
        }

        //"updateDemandDepositAccountTransfer" 시작
        Map<String, Object> accountRequestBody = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();

        Date today = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = formatter.format(today);

        SimpleDateFormat timeFormatter = new SimpleDateFormat("HHmmss");
        String formattedTime = timeFormatter.format(today);

        headerMap.put("apiName", "updateDemandDepositAccountTransfer");
        headerMap.put("transmissionDate", formattedDate);
        headerMap.put("transmissionTime", formattedTime);
        headerMap.put("institutionCode", "00100");
        headerMap.put("fintechAppNo", "001");
        headerMap.put("apiServiceCode", "updateDemandDepositAccountTransfer");
        headerMap.put("institutionTransactionUniqueNo", formattedDate + formattedTime + "000000");
        headerMap.put("apiKey", financialApiKey);
        headerMap.put("userKey", userKey);

        accountRequestBody.put("Header", headerMap);
        accountRequestBody.put("depositAccountNo", request.account());
        accountRequestBody.put("depositTransactionSummary", sender);
        accountRequestBody.put("transactionBalance", request.money());
        accountRequestBody.put("withdrawalAccountNo", account);
        accountRequestBody.put("withdrawalTransactionSummary", receiver);

        webClient.post()
                .uri(financialApiUrl + "/v1/edu/demandDeposit/updateDemandDepositAccountTransfer")
                .body(BodyInserters.fromValue(accountRequestBody))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        //알림전송
        notificationService.sendNotification(
                receiverToken,
                request.money() + "원 입금",
                sender + " -> 내 통장",
                receiverUrl

        );
        notificationService.sendNotification(
                senderToken,
                request.money() + "원 출금",
                "내 통장 -> " + receiver,
                senderUrl
        );

    }

    public void sendSalary(CustomUserDetails customUserDetails, SendSalaryRequest request) {
        Boss boss = bossRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new UnAuthorizedException("해당 권한이 없습니다."));
        String account = boss.getAccount();
        String userKey = boss.getUserKey();

        Crew crew = crewRepository.findById(request.crewId())
                .orElseThrow(() -> new NotFoundException("해당하는 알바생의 계좌가 존재하지 않습니다."));

        //"updateDemandDepositAccountTransfer" 시작
        Map<String, Object> accountRequestBody = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();

        Date today = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = formatter.format(today);

        SimpleDateFormat timeFormatter = new SimpleDateFormat("HHmmss");
        String formattedTime = timeFormatter.format(today);

        headerMap.put("apiName", "updateDemandDepositAccountTransfer");
        headerMap.put("transmissionDate", formattedDate);
        headerMap.put("transmissionTime", formattedTime);
        headerMap.put("institutionCode", "00100");
        headerMap.put("fintechAppNo", "001");
        headerMap.put("apiServiceCode", "updateDemandDepositAccountTransfer");
        headerMap.put("institutionTransactionUniqueNo", formattedDate + formattedTime + "000000");
        headerMap.put("apiKey", financialApiKey);
        headerMap.put("userKey", userKey);

        accountRequestBody.put("Header", headerMap);
        accountRequestBody.put("depositAccountNo", crew.getAccount());
        accountRequestBody.put("depositTransactionSummary", boss.getName() + " (급여)");
        accountRequestBody.put("transactionBalance", request.money());
        accountRequestBody.put("withdrawalAccountNo", account);
        accountRequestBody.put("withdrawalTransactionSummary", crew.getName() + " (급여)");

        log.info("crewId : {}", request.crewId());
        log.info("금액 : {}", request.money());

        webClient.post()
                .uri(financialApiUrl + "/v1/edu/demandDeposit/updateDemandDepositAccountTransfer")
                .body(BodyInserters.fromValue(accountRequestBody))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        notificationService.sendNotification(
                crew.getExpoPushToken(),
                request.money() + "원 입금",
                boss.getName() + " -> 내 통장 (급여)",
                "arbaguette://crew/authorized/banking/transaction"

        );
        notificationService.sendNotification(
                boss.getExpoPushToken(),
                request.money() + "원 출금",
                "내 통장 -> " + crew.getName() + " (급여)",
                "arbaguette://boss/banking/transaction"
        );

    }

    public void depositAccountWithdraw(Boss boss, int money) {
        Map<String, Object> accountRequestBody = new HashMap<>();
        Map<String, String> headerMap = new HashMap<>();

        Date today = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = formatter.format(today);

        SimpleDateFormat timeFormatter = new SimpleDateFormat("HHmmss");
        String formattedTime = timeFormatter.format(today);

        headerMap.put("apiName", "updateDemandDepositAccountWithdrawal");
        headerMap.put("transmissionDate", formattedDate);
        headerMap.put("transmissionTime", formattedTime);
        headerMap.put("institutionCode", "00100");
        headerMap.put("fintechAppNo", "001");
        headerMap.put("apiServiceCode", "updateDemandDepositAccountWithdrawal");
        headerMap.put("institutionTransactionUniqueNo", formattedDate + formattedTime + "000000");
        headerMap.put("apiKey", financialApiKey);
        headerMap.put("userKey", boss.getUserKey());

        accountRequestBody.put("Header", headerMap);
        accountRequestBody.put("accountNo", boss.getAccount());
        accountRequestBody.put("transactionBalance", String.valueOf(money));
        accountRequestBody.put("transactionSummary", "보너스 지급");

        webClient.post()
                .uri(financialApiUrl + "/v1/edu/demandDeposit/updateDemandDepositAccountWithdrawal")
                .body(BodyInserters.fromValue(accountRequestBody))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        notificationService.sendNotification(
                boss.getExpoPushToken(),
                money + "원 출금",
                "빵뿌리기",
                "myapp://boss/banking/transaction"
        );

    }
}
