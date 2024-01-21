package com.example.backend.services;

import com.example.backend.Exceptions.TokenNotFoundException;
import com.example.backend.TestHelper;
import com.example.backend.models.PasswordResetTokenEntity;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.PasswordResetTokenRepo;
import com.example.backend.repositories.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PasswordResetServiceUnitTest {

    @Mock
    private PasswordResetTokenRepo passwordResetTokenRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private PasswordResetService passwordResetService;

    private final int EXPIRATION = 3;
    UserEntity userEntity;
    String TOKEN;

    @BeforeEach
    public void setUp() {
        userEntity = TestHelper.createUserEntity();
        TOKEN = UUID.randomUUID().toString();
    }

    @Test
    public void whenSetPasswordResetTokenThenSaveTokenEntity() {
        UserEntity user = new UserEntity();
        String token = "resetToken";

        passwordResetService.setPasswordResetToken(user, token);

        verify(passwordResetTokenRepo, times(1)).save(any(PasswordResetTokenEntity.class));
    }

    @Test
    public void whenTokenIsValidThenReturnTrue() {
        String token = "validToken";
        PasswordResetTokenEntity passwordResetTokenEntity = createPasswordResetTokenEntity();

        when(passwordResetTokenRepo.findByToken(token)).thenReturn(Optional.of(passwordResetTokenEntity));

        assertTrue(passwordResetService.validatePasswordResetToken(token));
    }

    @Test
    public void whenTokenIsInvalidThenThrowException() {
        String token = "invalidToken";
        when(passwordResetTokenRepo.findByToken(token)).thenReturn(Optional.empty());

        assertThrows(TokenNotFoundException.class, () -> passwordResetService.validatePasswordResetToken(token));
    }

    @Test
    public void whenChangePasswordThenEncodeAndSaveNewPassword() {
        UserEntity user = TestHelper.createUserEntity();
        String newPassword = "newPassword";
        String encodedPassword = "encodedPassword";

        when(passwordEncoder.encode(newPassword)).thenReturn(encodedPassword);

        passwordResetService.changePassword(user, newPassword);

        assertEquals(encodedPassword, user.getPassword());
        verify(userRepo, times(1)).save(user);
    }

    @Test
    public void whenDeletePasswordResetTokenByTokenThenDeleteToken() {
        String token = "existingToken";
        PasswordResetTokenEntity entity = createPasswordResetTokenEntity();

        when(passwordResetTokenRepo.findByToken(token)).thenReturn(Optional.of(entity));

        passwordResetService.deletePasswordResetTokenByToken(token);

        verify(passwordResetTokenRepo, times(1)).delete(entity);
    }

    @Test
    public void whenDeleteNonExistingPasswordResetTokenThenThrowException() {
        String token = "nonExistingToken";
        when(passwordResetTokenRepo.findByToken(token)).thenReturn(Optional.empty());

        assertThrows(TokenNotFoundException.class, () -> passwordResetService.deletePasswordResetTokenByToken(token));
    }

    @Test
    public void whenLoadUserByValidPasswordResetTokenThenReturnUser() {
        String token = "validToken";
        PasswordResetTokenEntity passwordResetTokenEntity = createPasswordResetTokenEntity();

        when(passwordResetTokenRepo.findByToken(token)).thenReturn(Optional.of(passwordResetTokenEntity));

        UserEntity actualUser = passwordResetService.loadUserByPasswordResetToken(token);

        assertEquals(passwordResetTokenEntity.getUser(), actualUser);
    }

    @Test
    public void whenLoadUserByInvalidPasswordResetTokenThenThrowException() {
        String token = "invalidToken";
        when(passwordResetTokenRepo.findByToken(token)).thenReturn(Optional.empty());

        assertThrows(TokenNotFoundException.class, () -> passwordResetService.loadUserByPasswordResetToken(token));
    }

    @Test
    public void whenDeletePasswordResetTokenByValidUsernameThenDeleteToken() {
        String username = "validUsername";
        PasswordResetTokenEntity tokenEntity = createPasswordResetTokenEntity();

        when(passwordResetTokenRepo.findByUserUsername(username)).thenReturn(Optional.of(tokenEntity));

        passwordResetService.deletePasswordResetTokenByUsername(username);

        verify(passwordResetTokenRepo, times(1)).delete(tokenEntity);
    }

    @Test
    public void whenDeletePasswordResetTokenByInvalidUsernameThenDoNothing() {
        String username = "invalidUsername";
        when(passwordResetTokenRepo.findByUserUsername(username)).thenReturn(Optional.empty());

        passwordResetService.deletePasswordResetTokenByUsername(username);

        verify(passwordResetTokenRepo, never()).delete(any(PasswordResetTokenEntity.class));
    }

    private PasswordResetTokenEntity createPasswordResetTokenEntity() {
        PasswordResetTokenEntity tokenEntity = new PasswordResetTokenEntity();
        tokenEntity.setToken(TOKEN);
        tokenEntity.setUser(userEntity);
        tokenEntity.setExpiryDate(LocalDateTime.now().plusHours(EXPIRATION));
        return tokenEntity;
    }


}
