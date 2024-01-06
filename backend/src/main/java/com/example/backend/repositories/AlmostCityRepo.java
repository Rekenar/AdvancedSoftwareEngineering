package com.example.backend.repositories;

import com.example.backend.models.AlmostCityEntity;
import com.example.backend.models.HelloEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlmostCityRepo extends JpaRepository<AlmostCityEntity, Long> {

    @Query(value = "SELECT * FROM almost_game_capitals ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<AlmostCityEntity> sampleCities();

    @Query(value = "SELECT * FROM almost_game_capitals WHERE capital=true ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<AlmostCityEntity> sampleCapitals();
}