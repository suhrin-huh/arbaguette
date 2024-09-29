package com.lucky.arbaguette.common.jwt;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.CommonUserInfo;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        //request 에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.split(" ")[1];

        //토큰 소멸 시간 검증
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpStatus.I_AM_A_TEAPOT.value());
            response.getWriter().write(new ObjectMapper().writeValueAsString(
                    ApiResponse.error(HttpStatus.I_AM_A_TEAPOT, "access token expired")
            ));
            return;
        }

        //access 토큰 여부 검증
        if (!"access".equals(jwtUtil.getCategory(token))) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(SC_UNAUTHORIZED);
            response.getWriter().write(new ObjectMapper().writeValueAsString(
                    ApiResponse.error(HttpStatus.UNAUTHORIZED, "invalid access token")
            ));
            return;
        }

        String email = jwtUtil.getEmail(token);
        String role = jwtUtil.getRole(token);

        CommonUserInfo userInfo = CommonUserInfo.builder()
                .email(email)
                .role(role)
                .build();

        CustomUserDetails customUserDetails = new CustomUserDetails(userInfo);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null,
                customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return StringUtils.startsWithAny(request.getRequestURI(), "/api/login", "/api/user/**");
    }
}
