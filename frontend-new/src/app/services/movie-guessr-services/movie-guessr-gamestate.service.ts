import { Injectable } from '@angular/core';
import quizzesData from "../../movie-guessr/quizzes.json";

@Injectable({
  providedIn: 'root'
})
export class MovieGuessrGamestateService {
  coinCount: number = 0; // Initialize coin count
  selectedMovie: any; // Store the selected movie object
  selectedQuizIndex: number = 0; // Initialize with the first movie (you can change this for randomness)
  tileData: { category: string, hint: string, cost: number, flipped: boolean }[] = [];

  constructor() { }

  initializeGame() {
    // Initialize the game state, e.g., select a random movie
    // You can also set initial values for coin count and other properties
    this.coinCount = 10; // Initialize coin count to 10 (or any other value)
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


  // Add a method to flip a tile and deduct coins
  flipTile(tileIndex: number): boolean {
    console.log("Tile " + tileIndex + " clicked!");

    const tile = this.tileData[tileIndex];
    if(!tile.flipped) {
      if(this.coinCount >= tile.cost) {
        this.coinCount -= tile.cost;
        // Mark the tile as flipped
        tile.flipped = true;
        return true; // Tile flipped successfully
      } else {
        console.log("not enough coins!")
        return false; // Not enough coins to flip the tile
      }
    }

    console.log(tile)
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
}
