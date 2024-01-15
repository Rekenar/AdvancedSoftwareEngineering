package com.example.backend.models;

import com.example.backend.enums.Game;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity(name = "scores")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id", unique = true, nullable = false)
    private Long id;


    @JoinColumn(name = "username")
    private String user;


    @JoinColumn(name = "game_name")
    private Game game;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    public Score() {
    }

    public Score(Long id, String username, Game game, Integer score, LocalDateTime recordedAt) {
        this.id = id;
        this.user = user;
        this.game = game;
        this.score = score;
        this.recordedAt = recordedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getUser() {
        return user;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Game getGame() {
        return game;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getScore() {
        return score;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }
}
