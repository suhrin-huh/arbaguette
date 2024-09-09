package com.lucky.arbaguette.common.service;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.dto.CommonUserInfo;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomerUserDetailService implements UserDetailsService {

    private final BossRepository bossRepository;
    private final CrewRepository crewRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Boss boss = bossRepository.findByEmail(email).get();
        Crew crew = crewRepository.findByEmail(email).get();

        if (boss != null) {
            return new CustomUserDetails(CommonUserInfo.builder()
                    .email(boss.getEmail())
                    .role("BOSS")
                    .build());
        }

        if (crew != null) {
            return new CustomUserDetails(CommonUserInfo.builder()
                    .email(crew.getEmail())
                    .role("CREW")
                    .build());
        }

        return null;
    }
}
