package com.lucky.arbaguette.common.domain.dto.request;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.common.domain.dto.enums.UserRole;
import com.lucky.arbaguette.crew.domain.Crew;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Getter
@Setter
@ToString
public class UserJoinRequest {
    private String email;
    private String password;
    private String passwordConfirm;
    private String name;
    private String tel;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private int profileImage;

    public Boss toBoss(BCryptPasswordEncoder bCryptPasswordEncoder, String account, String userKey) {
        return Boss.builder()
                .email(this.email)
                .password(bCryptPasswordEncoder.encode(this.password))
                .name(this.name)
                .tel(this.tel)
                .profileImage(this.profileImage)
                .account(account)
                .userKey(userKey)
                .build();
    }

    public Crew toCrew(BCryptPasswordEncoder bCryptPasswordEncoder, String account, String userKey) {
        return Crew.builder()
                .email(this.email)
                .password(bCryptPasswordEncoder.encode(this.password))
                .name(this.name)
                .tel(this.tel)
                .profileImage(this.profileImage)
                .account(account)
                .userKey(userKey)
                .build();
    }
}
