package com.lucky.arbaguette.common.service;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class NotificationService {

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

        }
    }
}
