import { Injectable } from '@angular/core';
import quizzesData from "../../movie-guessr/quizzes.json";

@Injectable({
  providedIn: 'root'
})
export class MovieGuessrGamestateService {
  coinCount: number = 10; // Initialize coin count
  selectedMovie: any;
  selectedQuizIndex: number = 0;
  tileData: { category: string, hint: string, cost: number, flipped: boolean }[] = [];
  roundCount: number = 0; // Initialize round count to 0
  constructor() { }

  initializeGame() {
    // Initialize the game state
    const movies: any[] = quizzesData;
    // Generate a random index to select a quiz
    this.selectedQuizIndex = Math.floor(Math.random() * movies.length);

    // Assign the selected quiz to the property
    this.selectedMovie = movies[this.selectedQuizIndex];

    // Initialize tileData array with tile information
    this.tileData = this.selectedMovie.hints.map((hint: any) => ({
      category: hint.category,
      hint: hint.hint,
      cost: hint.cost, // Set the initial cost based on the hint
      flipped: false, // Initialize as not flipped
    }));

  }

  flipTile(tileIndex: number): boolean {
    console.log("Tile " + tileIndex + " clicked!");
    const tile = this.tileData[tileIndex];
    // Check if the tile is already flipped or if the player has enough coins to flip the tile
    if (!tile.flipped && this.coinCount >= tile.cost) {
      this.coinCount -= tile.cost;
      tile.flipped = true;
      return true; // Tile flipped successfully
    } else {
      console.log("not enough coins!")
      return false; // Not enough coins to flip the tile or tile already flipped
    }
  }

  checkGuess(userInput: string) {
    // Normalize the user input and the selected movie title for comparison
    const normalizedUserInput = userInput.trim().toLowerCase();
    const normalizedMovieTitle = this.selectedMovie.title.trim().toLowerCase();

    if (normalizedUserInput === normalizedMovieTitle) {
      this.nextRound();
      this.coinCount += 5;
      this.initializeGame();
    } else {
      if (this.coinCount > 0) {
        this.coinCount--;
      }
    }
  }

  nextRound() {
    // for later use
  }

  resetGame() {
    this.roundCount = 0;
    this.coinCount = 10;
  }
}
