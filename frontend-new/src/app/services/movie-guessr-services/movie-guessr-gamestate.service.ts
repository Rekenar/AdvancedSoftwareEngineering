import { Injectable } from '@angular/core';
import quizzesData from "../../movie-guessr/quizzes.json";
import { MatSnackBar } from '@angular/material/snack-bar';
import {GameOverDialogComponent} from "../../movie-guessr/game-over-dialog/game-over-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MovieGuessrService} from "./movie-guessr.service";

@Injectable({
  providedIn: 'root'
})
export class MovieGuessrGamestateService {
  coinCount: number = 0; // Initialize coin count
  selectedMovie: any;
  selectedQuizIndex: number = 0;
  tileData: { category: string, hint: string, cost: number, flipped: boolean }[] = [];
  roundCount: number = 0;
  playedGameIds: number[] = [];
  movies: any[] = [];
  lives: number = 5;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, public gameService: MovieGuessrService) { }

  initializeGame() {
    // Initialize the game state
    this.roundCount = -1;
    this.coinCount = 10;
    this.lives = 5;
    this.movies = quizzesData;
    this.nextRound()
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
      this.openSnackBar("Correct! +5 coins.", "Nice!")
      this.nextRound();
      this.coinCount += 5;
      //this.initializeGame();
    } else {
      this.openSnackBar("Incorrect movie!", "try again!");
      if (this.lives > 0) {
        this.lives--;
        if (this.lives <= 0) {
          this.openDialog();
        }
      }
      /*if (this.coinCount > 0) {
        this.coinCount--;
      }*/
    }
  }


  nextRound() {
    if(this.playedGameIds.length >= this.movies.length) {
      this.playedGameIds = [];
    }
    do (this.selectedQuizIndex = Math.floor(Math.random() * this.movies.length)); while (this.playedGameIds.includes(this.selectedQuizIndex));
    this.playedGameIds.push(this.selectedQuizIndex);

    // Assign the selected quiz to the property
    this.selectedMovie = this.movies[this.selectedQuizIndex];

    // Initialize tileData array with tile information
    this.tileData = this.selectedMovie.hints.map((hint: any) => ({
      category: hint.category,
      hint: hint.hint,
      cost: hint.cost, // Set the initial cost based on the hint
      flipped: false, // Initialize as not flipped
    }));
    this.roundCount++;
  }

  resetGame() {
    this.roundCount = -1;
    this.coinCount = 10;
    this.initializeGame()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(GameOverDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.gameService.postScore(this.roundCount);
      this.resetGame();
    });
  }
}
