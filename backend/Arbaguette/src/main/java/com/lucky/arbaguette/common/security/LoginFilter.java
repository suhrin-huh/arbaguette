package com.lucky.arbaguette.common.security;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.LoginRequest;
import com.lucky.arbaguette.common.domain.dto.response.LoginResponse;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.jwt.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

@RequiredArgsConstructor
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        LoginRequest loginRequest;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginRequest = objectMapper.readValue(messageBody, LoginRequest.class);
        } catch (IOException e) {
            throw new BadRequestException("유효하지 않는 요청입니다. 다시 확인 해주세요.");
        }

        String email = loginRequest.email();
        String password = loginRequest.password();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authentication) throws IOException, ServletException {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String email = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String token = jwtUtil.createJwt(email, role, 60 * 60 * 10L * 1000);

        //TODO: refresh 토큰 추가
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(
                ApiResponse.success(new LoginResponse(token, null))));
        response.getWriter().flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        String errorMessage;

        if (failed instanceof BadCredentialsException) {
            errorMessage = "아이디와 비밀번호를 확인해주세요.";
        } else {
            errorMessage = "알 수 없는 오류로 로그인 요청을 처리할 수 없습니다. 관리자에게 문의해주세요.";
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(SC_UNAUTHORIZED);
        response.getWriter().write(new ObjectMapper().writeValueAsString(
                ApiResponse.error(HttpStatus.UNAUTHORIZED, errorMessage)
        ));

    }
}
