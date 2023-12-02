package com.example.backend.services;

import com.example.backend.dtos.UserDetailsDTO;
import com.example.backend.models.UserEntity;
import com.example.backend.repositories.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    @Qualifier("passwordEncoder")
    private PasswordEncoder passwordEncoder;

    @Autowired
    ConfirmSignUpTokenService confirmSignUpTokenService;

    public List<UserEntity> findAll() {
        return userRepo.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> user = userRepo.findByUsername(username);
        return user.map(UserDetailsDTO::new).orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
    }


    public Long loadUserIdByUsername(String username) throws Exception {
        return userRepo.findByUsername(username)
                .map(UserEntity::getId)
                .orElseThrow(() -> new Exception("User not found: " + username));
    }


    @Transactional
    public UserEntity createUser(UserDetailsDTO dto) {
        if (userRepo.findByUsername(dto.getUsername()).isPresent()) {
            try {
                throw new Exception(); // BadCredentials
            } catch (Exception exception) {
                exception.printStackTrace();
            }
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(dto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(dto.getPassword()));

        return userRepo.save(userEntity);
    }

    @Transactional
    public void confirmUserSignUp(UserEntity entity, String token) throws Exception {
        // set user active
        entity.setEnabled(true);
        // remove the token after enabling the user
        confirmSignUpTokenService.deleteConfirmSignUpToken(token);
    }
}
