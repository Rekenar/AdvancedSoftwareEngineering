package com.example.backend.models;


import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "password_reset_token", uniqueConstraints = @UniqueConstraint(columnNames = "password_reset_token_id"))
public class PasswordResetTokenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "password_reset_token_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "token")
    private String token;

    @OneToOne(targetEntity = UserEntity.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserEntity user;

    private Date expiryDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
