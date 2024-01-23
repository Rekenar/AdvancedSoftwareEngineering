package com.example.backend.services;

import com.example.backend.dtos.ScoreDTO;
import com.example.backend.enums.Game;
import com.example.backend.models.Score;
import com.example.backend.repositories.ScoreRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class ScoreServiceUnitTest {
    @Mock
    private ScoreRepository scoreRepository;

    @InjectMocks
    private ScoreService scoreService;

    @ParameterizedTest
    @EnumSource(Game.class)
    void whenGettingAllScores_thenReturnsScoreDTOs(Game game) {
        // Arrange
        Score mockScore = new Score();
        mockScore.setUser("testUser");
        mockScore.setGame(game);
        mockScore.setScore(100);
        mockScore.setRecordedAt(LocalDateTime.now());
        when(scoreRepository.findAll()).thenReturn( List.of( mockScore ) );

        // Act
        List<ScoreDTO> scoreDTOs = scoreService.getAllScores();

        // Assert
        assertNotNull(scoreDTOs, "Returned list should not be null");
        assertEquals(1, scoreDTOs.size(), "List should contain one score");
        ScoreDTO scoreDTO = scoreDTOs.get(0);
        assertEquals("testUser", scoreDTO.getUsername(), "Username should match");
        assertEquals(game.getDisplayName(), scoreDTO.getGameName(), "Game name should match");
        assertEquals(100, scoreDTO.getScore(), "Score should match");
    }

    @Test
    void whenGettingAllScores_withNoScoresInDatabase_thenReturnsEmptyList() {
        // Arrange
        when(scoreRepository.findAll()).thenReturn( Collections.emptyList());

        // Act
        List<ScoreDTO> scoreDTOs = scoreService.getAllScores();

        // Assert
        assertNotNull(scoreDTOs, "Returned list should not be null");
        assertTrue(scoreDTOs.isEmpty(), "List should be empty");
    }

    @ParameterizedTest
    @EnumSource(Game.class)
    void whenCreatingScore_thenSavesScore(Game game) {
        // Arrange
        String username = "testUser";
        Integer scoreValue = 100;

        // Act
        scoreService.createScore(username, game, scoreValue);

        // Assert
        verify(scoreRepository).save(any(Score.class));
    }

    @ParameterizedTest
    @EnumSource(Game.class)
    void whenCreatingScore_withNullUsername_thenThrowsException(Game game) {
        // Arrange
        String username = null;
        Integer scoreValue = 100;

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> scoreService.createScore(username, game, scoreValue) );
    }

    @ParameterizedTest
    @EnumSource(Game.class)
    void whenCreatingScore_withBlankUsername_thenThrowsException(Game game) {
        // Arrange
        String username = "";
        Integer scoreValue = 100;

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> scoreService.createScore(username, game, scoreValue) );
    }

    @ParameterizedTest
    @EnumSource(Game.class)
    void whenCreatingScore_withNullGame_thenThrowsException(Game game) {
        // Arrange
        String username = "testUser";
        Integer scoreValue = 100;

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> scoreService.createScore(username, null, scoreValue) );
    }

    @ParameterizedTest
    @EnumSource(Game.class)
    void whenCreatingScore_withNullScore_thenThrowsException(Game game) {
        // Arrange
        String username = "testUser";
        Integer scoreValue = null;

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> scoreService.createScore(username, game, scoreValue) );
    }

    @ParameterizedTest
    @EnumSource(Game.class)
    void whenCreatingScore_withNegativeScore_thenThrowsException(Game game) {
        // Arrange
        String username = "testUser";
        Integer scoreValue = -1;

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> scoreService.createScore(username, game, scoreValue) );
    }
}