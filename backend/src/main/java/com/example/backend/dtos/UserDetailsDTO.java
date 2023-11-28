package com.example.backend.dtos;

import com.example.backend.models.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class UserDetailsDTO implements UserDetails {
    @Email
    @NotBlank
    @Size(max = 255)
    private String username;

    @NotBlank
    @Size(min = 8)
    private String password;

    private boolean isEnabled = false; // default false because not registered from beginning

    private boolean isDeleted = false;

    public UserDetailsDTO() {
    }

    public UserDetailsDTO(UserEntity userEntity) {
        this.username = userEntity.getUsername();
        this.password = userEntity.getPassword();
        this.isEnabled = userEntity.isEnabled();
        this.isDeleted = userEntity.isDeleted();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
