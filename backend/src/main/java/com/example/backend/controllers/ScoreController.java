package com.example.backend.controllers;

import com.example.backend.dtos.ScoreDTO;
import com.example.backend.dtos.ScoreInputDTO;
import com.example.backend.enums.Game;
import com.example.backend.services.ScoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scores")
@CrossOrigin
public class ScoreController {

    private final Logger logger = LoggerFactory.getLogger(ScoreController.class);

    ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ScoreDTO>> getAllScores() {
        try {
            List<ScoreDTO> scores = scoreService.getAllScores();
            return ResponseEntity.ok(scores);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }



    @PostMapping("/add")
    public ResponseEntity<String> addScore(@RequestBody ScoreInputDTO scoreInputDTO) {
        try {
            logger.info("Adding score");
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            Game gameEnum = Game.valueOf(Integer.valueOf( scoreInputDTO.getGameName()));
            scoreService.createScore(username, gameEnum, scoreInputDTO.getScore());
            return ResponseEntity.ok("Score added");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getLocalizedMessage());
        }
    }
}
