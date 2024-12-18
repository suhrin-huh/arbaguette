package com.lucky.arbaguette.common.domain;

import com.lucky.arbaguette.common.domain.dto.CommonUserInfo;
import java.util.ArrayList;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final CommonUserInfo commonUserInfo;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) commonUserInfo::role);

        return collection;
    }

    @Override
    public String getPassword() {
        return commonUserInfo.password();
    }

    @Override
    public String getUsername() {
        return commonUserInfo.email();
    }

    public String getRole() {
        return commonUserInfo.role();
    }

    public boolean isBoss() {
        return "BOSS".equals(commonUserInfo.role());
    }

    public boolean isCrew() {
        return "CREW".equals(commonUserInfo.role());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
