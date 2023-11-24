package com.example.backend.repositories;

import com.example.backend.models.HelloEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelloRepo extends JpaRepository<HelloEntity, Long> {
}