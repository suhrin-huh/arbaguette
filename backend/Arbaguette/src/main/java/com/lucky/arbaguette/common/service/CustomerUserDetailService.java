package com.lucky.arbaguette.common.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.dto.CommonUserInfo;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomerUserDetailService implements UserDetailsService {

    private final BossRepository bossRepository;
    private final CrewRepository crewRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Boss> boss = bossRepository.findByEmail(email);
        Optional<Crew> crew = crewRepository.findByEmail(email);

        return boss.map(value -> new CustomUserDetails(CommonUserInfo.builder()
                        .email(value.getEmail())
                        .password(value.getPassword())
                        .role("BOSS")
                        .build()))
                .orElseGet(() -> crew.map(value -> new CustomUserDetails(CommonUserInfo.builder()
                                .email(value.getEmail())
                                .password(value.getPassword())
                                .role("CREW")
                                .build()))
                        .orElse(null));
    }
}
