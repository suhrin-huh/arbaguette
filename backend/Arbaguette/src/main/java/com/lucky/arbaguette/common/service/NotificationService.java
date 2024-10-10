package com.lucky.arbaguette.common.service;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);
    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://exp.host/--/api/v2/push/send")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();


    public void sendNotification(String expoPushToken, String title, String message, String url) {

        try {
            if (expoPushToken == null || expoPushToken.isEmpty()) {
                throw new IllegalArgumentException("expoPushToken is null or empty");
            }

            webClient.post()
                    .bodyValue(Map.of(
                            "to", expoPushToken,
                            "title", title,
                            "body", message,
                            "data", Map.of("url", url)
                    ))
                    .retrieve()
                    .bodyToMono(String.class)
                    .subscribe(response -> System.out.println("Push Notification Sent! Response: " + response),
                            error -> System.out.println("Push Notification Error: " + error.getMessage()));
        } catch (Exception e) {
            log.info("notification-error: {}", e.getMessage());
        }
    }
}
