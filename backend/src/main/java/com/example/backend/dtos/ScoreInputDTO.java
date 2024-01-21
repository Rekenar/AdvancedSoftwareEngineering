package com.example.backend.dtos;

public class ScoreInputDTO {

    private String gameName;
    private Integer score;

    public ScoreInputDTO() {
    }

    public ScoreInputDTO(String gameName, Integer score) {
        this.gameName = gameName;
        this.score = score;
    }

    public String getGameName() {
        return gameName;
    }

    public Integer getScore() {
        return score;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
