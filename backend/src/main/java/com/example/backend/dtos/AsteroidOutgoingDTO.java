package com.example.backend.dtos;

import com.example.backend.services.Asteroid;

import java.util.List;

public class AsteroidOutgoingDTO {

    private String error;
    private List<Asteroid> asteroids;

    public AsteroidOutgoingDTO() {
    }

    public AsteroidOutgoingDTO(String error, List<Asteroid> asteroids) {
        this.error = error;
        this.asteroids = asteroids;
    }

    public AsteroidOutgoingDTO(String localizedMessage) {
        this.error = localizedMessage;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<Asteroid> getAsteroids() {
        return asteroids;
    }

    public void setAsteroids(List<Asteroid> asteroids) {
        this.asteroids = asteroids;
    }



}
