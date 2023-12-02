package com.example.backend.security.models;

import org.springframework.security.core.GrantedAuthority;

import java.util.Date;
import java.util.List;

public class AuthenticationResponse {

    private final String jwt;
    private final Long id;
    private final String username;
    private final List<GrantedAuthority> authorities;
    private final Date expiration;
    private final Integer expirationTime;

    public AuthenticationResponse(String jwt, Long id, String username, List<GrantedAuthority> authorities, Date expiration, Integer expirationTime) {
        this.jwt = jwt;
        this.id = id;
        this.username = username;
        this.authorities = authorities;
        this.expiration = expiration;
        this.expirationTime = expirationTime;
    }


    public String getJwt() {
        return jwt;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public List<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Date getExpiration() {
        return expiration;
    }

    public Integer getExpirationTime() {
        return expirationTime;
    }
}
