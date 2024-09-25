package com.lucky.arbaguette.common.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucky.arbaguette.common.domain.dto.request.LogoutRequest;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.repository.TokenRedisRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.GenericFilterBean;

public class LogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final TokenRedisRepository tokenRedisRepository;

    public LogoutFilter(JWTUtil jwtUtil, TokenRedisRepository tokenRedisRepository) {
        this.jwtUtil = jwtUtil;
        this.tokenRedisRepository = tokenRedisRepository;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        //경로, method 검증
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^\\/api\\/logout$")) {
            filterChain.doFilter(request, response);
            return;
        }
        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        //get refresh token
        String refresh = getRefreshToken(request);
        String category = jwtUtil.getCategory(refresh);
        String email = jwtUtil.getEmail(refresh);
        
        validRefreshToken(refresh, category, email, response);

        //로그아웃 진행
        //Refresh 토큰 DB 에서 제거
        tokenRedisRepository.deleteBy(email);

        response.setStatus(HttpServletResponse.SC_OK);
    }

    private String getRefreshToken(HttpServletRequest request) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            return objectMapper.readValue(messageBody, LogoutRequest.class).refreshToken();
        } catch (IOException e) {
            throw new BadRequestException("유효하지 않는 요청입니다. 다시 확인 해주세요.");
        }
    }

    private void validRefreshToken(String refresh, String category, String email, HttpServletResponse response) {
        if (refresh == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        if (!category.equals("refresh")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        if (!tokenRedisRepository.existsBy(email)) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
    }
}
