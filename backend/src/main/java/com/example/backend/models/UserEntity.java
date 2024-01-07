package com.example.backend.models;

import com.example.backend.repositories.UserRepo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", unique = true, nullable = false)
    private Long id;

    @Email(message = "must be valid e-mail")
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "password must not be empty")
    @JsonIgnore
    private String password;

    @Column(name = "user_enabled") // to check if user registration complete or not
    private boolean isEnabled = false;

    @Column(name = "user_deleted") // for soft deletion
    private boolean isDeleted = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}


@Component
class UserEntityLoader implements CommandLineRunner {

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     *
     * creates default user with id=1, username=user@user.at, password=user1234
     */
    @Override
    public void run(String... args) {
        String username = "user@user.at";
        if (userRepo.findByUsername(username).isEmpty()) {
            UserEntity entity = new UserEntity();
            entity.setId(1L);
            entity.setUsername(username);
            entity.setEnabled(true);
            entity.setPassword(passwordEncoder.encode("user1234"));
            entity.setDeleted(false);
            userRepo.save(entity);
        }

    }
}