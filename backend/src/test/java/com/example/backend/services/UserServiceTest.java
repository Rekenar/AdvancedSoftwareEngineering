package com.example.backend.services;

import com.example.backend.dtos.UserDetailsDTO;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void loadUserByUsernameWhenUserExists() {
        String username = "testUser";
        UserEntity mockUser = new UserEntity();
        mockUser.setUsername(username);
        when(userRepo.findByUsername(username)).thenReturn(Optional.of(mockUser));

        UserDetails result = userService.loadUserByUsername(username);

        assertEquals(username, result.getUsername());
    }

    @Test
    void loadUserByUsernameWhenUserNotExists() {
        String username = "testUser";
        when(userRepo.findByUsername(username)).thenReturn(Optional.empty());
        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(username));
    }

    @Test
    void whenLoadUserIdByUsernameThenReturnUserId() throws Exception {
        String username = "testUser";
        UserEntity user = new UserEntity();
        user.setId(1L);

        when(userRepo.findByUsername(username)).thenReturn(Optional.of(user));
        Long userId = userService.loadUserIdByUsername(username);

        assertNotNull(userId);
        assertEquals(1L, userId);
    }

    @Test
    void whenUsernameNotFoundThenThrowException() {

        String username = "notExistingUser";
        when(userRepo.findByUsername(username)).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> {
            userService.loadUserIdByUsername(username);
        });
    }

    @Test
    void whenCreateUserThenUserIsSaved() throws Exception {
        UserDetailsDTO newUser = createUser();
        UserEntity userEntity = createUserEntity(newUser);

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

    private static UserEntity createUserEntity(UserDetailsDTO newUser) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(newUser.getUsername());
        userEntity.setPassword(newUser.getPassword());
        userEntity.setEnabled(newUser.isEnabled());
        userEntity.setDeleted(newUser.isDeleted());
        return userEntity;
    }

    private static UserDetailsDTO createUser() {
        UserDetailsDTO newUser = new UserDetailsDTO();
        newUser.setUsername("user@user.at");
        newUser.setPassword("user1234");
        newUser.setEnabled(false);
        newUser.setDeleted(false);
        return newUser;
    }

    @Test
    void whenCreateExistingUserThenThrowException() throws Exception {
        UserDetailsDTO existingUser = createUser();

        when(userRepo.findByUsername(existingUser.getUsername())).thenReturn(Optional.of(new UserEntity()));

        assertThrows(BadCredentialsException.class, () -> {
            userService.createUser(existingUser);
        });
    }



}