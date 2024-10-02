//package com.lucky.arbaguette.substitute.service;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//import com.lucky.arbaguette.common.domain.CustomUserDetails;
//import com.lucky.arbaguette.common.domain.dto.CommonUserInfo;
//import com.lucky.arbaguette.substitute.dto.request.SubstituteRequest;
//import java.util.concurrent.CountDownLatch;
//import java.util.concurrent.ExecutorService;
//import java.util.concurrent.Executors;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//class SubstituteServiceTest {
//
//    @Autowired
//    private SubstituteService substituteService;
//
//    @DisplayName("동시에 100개의 선착순 대타희망 요청 시 하나만 처리됨")
//    @Test
//    void applySubstituteThreadTest() {
//        int threadCount = 100;
//        ExecutorService executorService = Executors.newFixedThreadPool(32);
//        CountDownLatch countDownLatch = new CountDownLatch(threadCount);
//
//        CustomUserDetails userDetails = new CustomUserDetails(
//                new CommonUserInfo("testUser@gmail.com", "12", "CREW"));
//        SubstituteRequest request = new SubstituteRequest(99); // 테스트용 스케줄 ID
//
//        for (int i = 0; i < threadCount; i++) {
//            executorService.submit(() -> {
//                try {
//                    substituteService.applySubstitute(userDetails, request);
//                } catch (Exception e) {
//                    // 예외가 발생해도 테스트에서는 카운트를 줄입니다.
//                    System.out.println("Exception occurred: " + e.getMessage());
//                } finally {
//                    countDownLatch.countDown();
//                }
//            });
//        }
//
//        // 모든 스레드가 작업을 마칠 때까지 대기합니다.
//        countDownLatch.await();
//        executorService.shutdown();
//
//        // 테스트 후 검증 (하나만 성공해야 함)
//        // 이 부분에서는 서비스 로직이 제대로 동작했는지 확인하는 부분을 작성합니다.
//        // 예를 들어, substitute 상태를 조회하거나 로그를 검증하는 식으로 확인합니다.
//        long appliedCount = substituteRepository.countByApplied(true);
//        assertEquals(1, appliedCount, "선착순으로 하나의 대타만 처리되어야 합니다.");
//    }
//}