package com.example.backend.dtos;

import java.time.LocalDateTime;


public class ScoreDTO {

    private String gameName;
    private String username;
    private Integer score;
    private LocalDateTime date;

    public ScoreDTO() {
    }
    public ScoreDTO(String gameName, String username, Integer score, LocalDateTime date) {
        this.gameName = gameName;
        this.username = username;
        this.score = score;
        this.date = date;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDateTime getRecordedAt() {
        return date;
    }

    public void setRecordedAt(LocalDateTime date) {
        this.date = date;
    }
}
