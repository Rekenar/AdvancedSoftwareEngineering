package com.example.backend.services;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;

import com.example.backend.dtos.AsteroidOutgoingDTO;
import com.example.backend.dtos.PowerUpDTO;

@ExtendWith(MockitoExtension.class)
public class AsteroidServiceUnitTest {

    @InjectMocks
    private AsteroidService asteroidService;

    @Test
    void whenGettingAsteroidDataWithValidDimensions_thenReturnsValidData() {
        // Arrange
        int width = 100;
        int height = 100;

        // Act
        AsteroidOutgoingDTO result = asteroidService.getAsteroidData(width, height);

        // Assert
        assertNotNull(result, "Result should not be null");
        assertNull(result.getError(), "Error should be null");
        assertEquals(10, result.getAsteroids().size(), "Should return 10 asteroids");
    }

    @Test
    void whenGettingAsteroidDataWithInvalidDimensions_thenReturnsError() {
        // Arrange
        int width = -1;
        int height = -1;

        // Act
        AsteroidOutgoingDTO result = asteroidService.getAsteroidData(width, height);

        // Assert
        assertEquals("Width and height must be positive", result.getError(), "Error message should match");
    }

    @Test
    void whenGettingPowerUpDataWithValidDimensions_thenReturnsValidData() {
        // Arrange
        int width = 100;
        int height = 100;

        // Act
        PowerUpDTO result = asteroidService.getPowerUpData(width, height);

        // Assert
        assertNotNull(result, "Result should not be null");
        assertNull(result.getError(), "Error should be null");
        assertEquals(2, result.getPowerUp().size(), "Should return 2 power-ups");
    }

    @Test
    void whenGettingPowerUpDataWithInvalidDimensions_thenReturnsError() {
        // Arrange
        int width = -1;
        int height = -1;

        // Act
        PowerUpDTO result = asteroidService.getPowerUpData(width, height);

        // Assert
        assertEquals("Width and height must be positive", result.getError(), "Error message should match");
    }
}