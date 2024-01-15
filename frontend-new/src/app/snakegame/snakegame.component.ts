import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-snakegame',
  templateUrl: './snakegame.component.html',
  styleUrls: ['./snakegame.component.css']
})
export class SnakegameComponent {
  gridSize = 15;
  snakePosition: { row: number, col: number }[] = [{ row: 0, col: 0 }];
  foodPosition: { row: number, col: number } = { row: 5, col: 5 };
  direction: 'up' | 'down' | 'left' | 'right' = 'right'; // Initial direction
  score = 0;

  isGameStarted: boolean = false;
  isGameOver = false;
  gameInterval: any;

  startGame() {
    this.isGameStarted = true;

    this.initializeGame();

    this.gameInterval = setInterval(() => this.updateGame(), 200);
  }


  initializeGame(): void {
    // Reset the snake and food positions
    this.snakePosition  = [{ row: 0, col: 0 }];
    this.foodPosition = { row: 5, col: 5 };

    this.direction = 'right';
    this.isGameOver = false;
    this.score = 0;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.direction !== 'down') {
          this.direction = 'up';
        }
        break;
      case 'ArrowDown':
        if (this.direction !== 'up') {
          this.direction = 'down';
        }
        break;
      case 'ArrowLeft':
        if (this.direction !== 'right') {
          this.direction = 'left';
        }
        break;
      case 'ArrowRight':
        if (this.direction !== 'left') {
          this.direction = 'right';
        }
        break;
    }
  }

  updateGame(): void {
    if (this.isGameOver) {
      clearInterval(this.gameInterval); // Stop the game loop
      return;
    }

    // Update snake position based on the current direction
    const head = { ...this.snakePosition[0] };
    switch (this.direction) {
      case 'up':
        head.col -= 1;
        break;
      case 'down':
        head.col += 1;
        break;
      case 'left':
        head.row -= 1;
        break;
      case 'right':
        head.row += 1;
        break;
    }

    // Add the new head to the front of the snake
    this.snakePosition.unshift(head);

    // Check for collisions with the board edges
    if (head.row < 0 || head.row >= this.gridSize || head.col < 0 || head.col >= this.gridSize) {
      console.log('Game Over - Collision with board edges');

      this.showGameOverOverlay();
    }

    // Check for collisions with the snake's body
    if (this.snakePosition.slice(1).some(pos => pos.row === head.row && pos.col === head.col)) {
      // Collision with the snake's body
      console.log('Game Over - Collision with the snake\'s body');
      this.showGameOverOverlay();
      return; // Stop further processing since the game is over
    }

    // Check for collisions with food
    if (head.row === this.foodPosition.row && head.col === this.foodPosition.col) {
      // Handle snake eating food
      console.log('Snake ate the food!');

      // Generate a new random food position
      this.generateRandomFoodPosition();

      this.score += 10;
    } else {
      // Remove the tail if the snake hasn't eaten food
      this.snakePosition.pop();
    }
  }

  generateRandomFoodPosition(): void {
    const newFoodPosition: { row: number, col: number } = {
      row: Math.floor(Math.random() * this.gridSize),
      col: Math.floor(Math.random() * this.gridSize)
    };

    // Ensure the new food position is not on the snake
    while (this.snakePosition.some(pos => pos.row === newFoodPosition.row && pos.col === newFoodPosition.col)) {
      newFoodPosition.row = Math.floor(Math.random() * this.gridSize);
      newFoodPosition.col = Math.floor(Math.random() * this.gridSize);
    }

    // Update the food position
    this.foodPosition = newFoodPosition;
  }

  showGameOverOverlay(): void {
    this.isGameOver = true;
  }

  resetGame(): void {
    // Reset the snake and food positions
    this.snakePosition = [{ row: 0, col: 0 }];
    //this.foodPosition = this.generateRandomFoodPosition();

    // Reset the direction and any other game state variables
    this.direction = 'right';
    this.isGameOver = false; // Reset game over state
    this.score = 0;

    this.startGame();
  }

  exitGame() {
    console.log('Exiting the game');

    this.snakePosition  = [{ row: 0, col: 0 }];
    this.foodPosition = { row: 5, col: 5 };

    this.isGameStarted = false;
    this.isGameOver = false;
  }

}
