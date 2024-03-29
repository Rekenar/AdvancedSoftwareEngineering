package com.example.backend.repositories;

import com.example.backend.models.TypingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TypingRepo extends JpaRepository<TypingEntity, Long> {

}