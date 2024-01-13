package com.example.backend.services;

import com.example.backend.Exceptions.TokenNotFoundException;
import com.example.backend.messages.ErrorMessages;
import com.example.backend.models.PasswordResetTokenEntity;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.PasswordResetTokenRepo;
import com.example.backend.repositories.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PasswordResetService {

    @Autowired
    PasswordResetTokenRepo passwordResetTokenRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo userRepo;

    @Value("${SIGN_UP_TOKEN_EXPIRY_IN_HOURS}")
    private int EXPIRATION; // in hours

    @Transactional
    public void setPasswordResetToken(UserEntity user, String token) {
        PasswordResetTokenEntity passwordResetTokenEntity = new PasswordResetTokenEntity();
        passwordResetTokenEntity.setToken(token);
        passwordResetTokenEntity.setUser(user);

        LocalDateTime expiryDate = LocalDateTime.now().plusHours(EXPIRATION);
        passwordResetTokenEntity.setExpiryDate(expiryDate);

        passwordResetTokenRepo.save(passwordResetTokenEntity);
    }

    public boolean validatePasswordResetToken(String token) {
        PasswordResetTokenEntity tokenEntity = passwordResetTokenRepo.findByToken(token)
                .orElseThrow(() -> new TokenNotFoundException(ErrorMessages.PASSWORD_RESET_TOKEN_NOT_FOUND.getCode()));
        LocalDateTime expiryDate = tokenEntity.getExpiryDate();
        return LocalDateTime.now().isBefore(expiryDate);
    }

    public UserEntity loadUserByPasswordResetToken(String token) {
        return passwordResetTokenRepo.findByToken(token)
                .orElseThrow(() -> new TokenNotFoundException(ErrorMessages.PASSWORD_RESET_TOKEN_NOT_FOUND.getCode()))
                .getUser();
    }

    @Transactional
    public void changePassword(UserEntity user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    @Transactional
    public void deletePasswordResetTokenForUser(String token) {
        PasswordResetTokenEntity entity = passwordResetTokenRepo.findByToken(token)
                .orElseThrow(() -> new TokenNotFoundException(ErrorMessages.PASSWORD_RESET_TOKEN_NOT_FOUND.getCode()));
        passwordResetTokenRepo.delete(entity);
    }
}
