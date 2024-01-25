package com.example.backend.services;

import com.example.backend.TestHelper;
import com.example.backend.dtos.UserDetailsDTO;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ConfirmSignUpTokenService confirmSignUpTokenService;

    @InjectMocks
    private UserService userService;
    private UserEntity mockUser;

    @BeforeEach
    void setUp() {
        mockUser = TestHelper.createUserEntity();
    }

    @Test
    void loadUserByUsernameWhenUserExistsReturnUserDetails() {
        when(userRepo.findByUsername(mockUser.getUsername())).thenReturn(Optional.of(mockUser));
        UserDetails result = userService.loadUserByUsername(mockUser.getUsername());
        assertEquals(mockUser.getUsername(), result.getUsername());
    }

    @Test
    void loadUserByUsernameWhenUserNotExists() {
        when(userRepo.findByUsername(mockUser.getUsername())).thenReturn(Optional.of(mockUser));
        when(userRepo.findByUsername(mockUser.getUsername())).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(mockUser.getUsername()));
    }

    @Test
    void whenLoadUserIdByUsernameThenReturnUserId() throws Exception {
        when(userRepo.findByUsername(mockUser.getUsername())).thenReturn(Optional.of(mockUser));
        Long userId = userService.loadUserIdByUsername(mockUser.getUsername());

        assertNotNull(userId);
        assertEquals(1L, userId);
    }

    @Test
    void whenUsernameNotFoundThenThrowException() {

        String nonExistingUser = "notExistingUser";
        when(userRepo.findByUsername(mockUser.getUsername())).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> userService.loadUserIdByUsername(nonExistingUser));
    }

    @Test
    void whenCreateUserThenUserIsSaved() {
        UserDetailsDTO newUser = TestHelper.createMockUserDto();
        newUser.setEnabled(false);
        UserEntity userEntity = TestHelper.createUserEntity(newUser);

        // for check if User already present -> returns empty
        when(userRepo.findByUsername(newUser.getUsername())).thenReturn(Optional.empty());
        when(userRepo.save(any(UserEntity.class))).thenReturn(userEntity);

        UserEntity savedUser = userService.createUser(newUser);

        assertNotNull(savedUser);
        assertEquals(newUser.getUsername(), savedUser.getUsername());
        assertEquals(newUser.getPassword(), savedUser.getPassword());
        assertFalse(savedUser.isEnabled());
        assertFalse(savedUser.isDeleted());
    }



    @Test
    void whenCreateExistingUserThenThrowException() {
        UserDetailsDTO existingUser = TestHelper.createMockUserDto();

        when(userRepo.findByUsername(existingUser.getUsername())).thenReturn(Optional.of(new UserEntity()));

        assertThrows(BadCredentialsException.class, () -> userService.createUser(existingUser));
    }

    @Test
    void whenConfirmUserSignUpThenUserIsEnabled() throws Exception {
        String mockToken = "mockToken";
        mockUser.setEnabled(false);

        userService.confirmUserSignUp(mockUser, mockToken);

        assertTrue(mockUser.isEnabled(), "User should be enabled after confirmation");

        verify(confirmSignUpTokenService).deleteConfirmSignUpToken(mockToken);
    }

    @Test
    void testConvertUserDetailsToUserDetailsDTO() {
        UserDetails userDetails = User.withUsername("testuser@user.at")
                .password("user1234")
                .build();
        UserDetailsDTO dto = userService.convertUserDetailsToUserDetailsDTO(userDetails);

        assertEquals("testuser@user.at", dto.getUsername());
        assertEquals("user1234", dto.getPassword());
    }

    @Test
    void whenLoadUserEntityByUsernameWithExistingUserThenAssertEqualUsernames() {
        UserEntity mockUser = TestHelper.createUserEntity();

        when(userRepo.findByUsername(mockUser.getUsername())).thenReturn(Optional.of(mockUser));

        UserEntity result = userService.loadUserEntityByUsername(mockUser.getUsername());

        assertEquals(mockUser.getUsername(), result.getUsername());
    }

    @Test
    void whenLoadUserEntityByUsernameWithNonExistingUserThenThrowUsernameNotFoundException() {
        when(userRepo.findByUsername(mockUser.getUsername())).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserEntityByUsername(mockUser.getUsername()));
    }



}