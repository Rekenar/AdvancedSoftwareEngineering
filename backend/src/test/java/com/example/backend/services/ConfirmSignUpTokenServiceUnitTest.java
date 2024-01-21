package com.example.backend.services;

import com.example.backend.TestHelper;
import com.example.backend.dtos.SignUpSuccessDTO;
import com.example.backend.dtos.UserDetailsDTO;
import com.example.backend.messages.SuccessMessages;
import com.example.backend.models.ConfirmSignUpTokenEntity;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.ConfirmSignUpTokenRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ConfirmSignUpTokenServiceUnitTest {

    private final int EXPIRATION = 3;
    @Mock
    private ConfirmSignUpTokenRepo confirmSignUpTokenRepo;

    @InjectMocks
    private ConfirmSignUpTokenService confirmSignUpTokenService;

    UserDetailsDTO defaultUserDetails;
    UserEntity userEntity;
    String TOKEN;

    @BeforeEach
    public void setUp() {
        defaultUserDetails = TestHelper.createMockUserDto();
        userEntity = TestHelper.createUserEntity();
        TOKEN = UUID.randomUUID().toString();
    }

    @Test
    public void whenTokenIsValidThenShouldReturnTrue() throws Exception {
        String token = UUID.randomUUID().toString();
        ConfirmSignUpTokenEntity tokenEntity = createDefaultSignUpTokenEntity();

        when(confirmSignUpTokenRepo.findByToken(token)).thenReturn(Optional.of(tokenEntity));

        assertTrue(confirmSignUpTokenService.validateConfirmPasswordToken(token));
    }

    @Test
    public void whenCreateTokenForUserThenSetTokenExpiry() {

        ConfirmSignUpTokenEntity confirmSignUpTokenEntity = createDefaultSignUpTokenEntity();

        when(confirmSignUpTokenRepo.save(any(ConfirmSignUpTokenEntity.class))).thenReturn(confirmSignUpTokenEntity);

        ConfirmSignUpTokenEntity savedEntity = confirmSignUpTokenService.createConfirmSignUpTokenForUser(userEntity, TOKEN);

        assertNotNull(savedEntity);
        assertEquals(userEntity, savedEntity.getUser());
        assertEquals(TOKEN, savedEntity.getToken());
        assertNotNull(savedEntity.getExpiryDate());
        assertEquals(confirmSignUpTokenEntity.getExpiryDate(), savedEntity.getExpiryDate());
    }

    @Test
    public void whenDeleteExistingTokenThenShouldDeleteUsingRepo() throws Exception {
        String token = "existingToken";
        when(confirmSignUpTokenRepo.findByToken(token)).thenReturn(Optional.of(new ConfirmSignUpTokenEntity()));

        confirmSignUpTokenService.deleteConfirmSignUpToken(token);

        verify(confirmSignUpTokenRepo, times(1)).delete(any(ConfirmSignUpTokenEntity.class));
    }

    @Test
    public void whenDeleteNonExistingTokenThenShouldThrowException() {
        String token = "nonExistingToken";
        when(confirmSignUpTokenRepo.findByToken(token)).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> confirmSignUpTokenService.deleteConfirmSignUpToken(token));
    }

    @Test
    public void whenLoadUserByValidTokenThenReturnUser() throws Exception {
        String token = "validToken";
        ConfirmSignUpTokenEntity confirmSignUpTokenEntity = createDefaultSignUpTokenEntity();

        when(confirmSignUpTokenRepo.findByToken(token)).thenReturn(Optional.of(confirmSignUpTokenEntity));

        UserEntity actualUser = confirmSignUpTokenService.loadUserByConfirmSignUpToken(token);

        assertEquals(confirmSignUpTokenEntity.getUser(), actualUser);
    }

    @Test
    public void whenLoadUserByInvalidTokenThenThrowException() {
        String token = "invalidToken";
        when(confirmSignUpTokenRepo.findByToken(token)).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> confirmSignUpTokenService.loadUserByConfirmSignUpToken(token));
    }

    @Test
    public void whenGetSignupTokenSuccessBodyThenReturnSignUpSuccessDTO() {
        String confirmUrl = "http://localhost:8080/api/users/confirm-sign-up";
        SignUpSuccessDTO dto = confirmSignUpTokenService.getSignupTokenSuccessBody(confirmUrl);

        assertNotNull(dto);
        assertEquals(SuccessMessages.CONFIRM_REGISTRATION_MAIL_SENT.getMessage(), dto.message());
        assertEquals(confirmUrl, dto.confirmSignupToken());
    }

    private ConfirmSignUpTokenEntity createDefaultSignUpTokenEntity() {
        ConfirmSignUpTokenEntity confirmSignUpTokenEntity = new ConfirmSignUpTokenEntity();
        confirmSignUpTokenEntity.setUser(userEntity);
        confirmSignUpTokenEntity.setToken(TOKEN);
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR_OF_DAY, EXPIRATION);
        confirmSignUpTokenEntity.setExpiryDate(calendar.getTime());
        return confirmSignUpTokenEntity;
    }

}
