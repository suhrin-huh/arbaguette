package com.lucky.arbaguette.common.domain.dto.enums;

public enum UserRole {
    BOSS("BOSS"),
    CREW("CREW");

    private String role;

    private UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
    }

}
