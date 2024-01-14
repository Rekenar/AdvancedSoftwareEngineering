package com.example.backend.services;

import com.example.backend.dtos.ScoreDTO;
import com.example.backend.enums.Game;
import com.example.backend.models.Score;
import com.example.backend.repositories.ScoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.repositories.UserRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ScoreService {
    UserRepo userRepo;

    ScoreRepository scoreRepository;



    public ScoreService(UserRepo userRepo, ScoreRepository scoreRepository) {
        this.userRepo = userRepo;
        this.scoreRepository = scoreRepository;
    }

    public List<ScoreDTO> getAllScores() {
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
    }

    public void createScore(String username, Game game, Integer scoreValue) {

        Score score = new Score();
        score.setUser(username);
        score.setGame(game);
        score.setScore(scoreValue);
        score.setRecordedAt(LocalDateTime.now()); // Set the current date and time

        scoreRepository.save(score);
    }
}
