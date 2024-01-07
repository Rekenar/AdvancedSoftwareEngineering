package com.example.backend.services;

import com.example.backend.models.UserEntity;
import com.example.backend.repositories.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepo userRepo;

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


}