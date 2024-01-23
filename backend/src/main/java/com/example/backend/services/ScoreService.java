package com.example.backend.services;

import com.example.backend.dtos.ScoreDTO;
import com.example.backend.enums.Game;
import com.example.backend.models.Score;
import com.example.backend.repositories.ScoreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.repositories.UserRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ScoreService {

    private final Logger logger = LoggerFactory.getLogger(ScoreService.class);
    UserRepo userRepo;

    ScoreRepository scoreRepository;



    public ScoreService(UserRepo userRepo, ScoreRepository scoreRepository) {
        this.userRepo = userRepo;
        this.scoreRepository = scoreRepository;
    }

    public List<ScoreDTO> getAllScores() {
        try {
            List<Score> scores = scoreRepository.findAll();
            List<ScoreDTO> scoreDTOs = new ArrayList<>();

            for (Score score : scores) {
                ScoreDTO scoreDTO = new ScoreDTO();
                scoreDTO.setGameName(score.getGame().getDisplayName());
                scoreDTO.setUsername(score.getUser());
                scoreDTO.setScore(score.getScore());
                scoreDTO.setRecordedAt(score.getRecordedAt());
                scoreDTOs.add(scoreDTO);
            }

            return scoreDTOs;
        } catch (Exception e) {
            logger.error( e.getMessage() );
            throw new IllegalArgumentException("Error getting scores" + e.getMessage());
        }
    }

    public void createScore(String username, Game game, Integer scoreValue) {
        try {
            if (username == null || username.isBlank()) {
                throw new IllegalArgumentException("Username cannot be null or blank");
            }
            if (game == null) {
                throw new IllegalArgumentException("Game cannot be null");
            }
            if (scoreValue == null || scoreValue < 0) {
                throw new IllegalArgumentException("Score cannot be null or negative");
            }
            Score score = new Score();
            score.setUser(username);
            score.setGame(game);
            score.setScore(scoreValue);
            score.setRecordedAt(LocalDateTime.now()); // Set the current date and time

            scoreRepository.save(score);
        } catch (Exception e) {
            logger.error( e.getMessage() );
            throw new IllegalArgumentException("Error getting scores" + e.getMessage());
        }
    }
}
