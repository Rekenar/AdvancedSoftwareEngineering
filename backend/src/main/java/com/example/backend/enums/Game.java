package com.example.backend.enums;

public enum Game {
    Game1("Almost Game"),
    Game2("Game 2"),
    Game3("Snake"),
    Game4("Game 4"),
    Game5("Asteroid");

    private final String displayName;

    Game(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }


    public static Game valueOf(Integer gameNumber) {
        return switch (gameNumber) {
            case 1 -> Game1;
            case 2 -> Game2;
            case 3 -> Game3;
            case 4 -> Game4;
            case 5 -> Game5;
            default -> throw new IllegalArgumentException("Invalid game number");
        };
    }
}
