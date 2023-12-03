package com.example.backend.repositories;

import com.example.backend.models.ConfirmSignUpTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfirmSignUpTokenRepo extends JpaRepository<ConfirmSignUpTokenEntity, Long> {

    Optional<ConfirmSignUpTokenEntity> findByToken(String token);
}
