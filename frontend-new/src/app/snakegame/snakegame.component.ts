// snakegame.component.ts
import { Component, HostListener, OnInit } from '@angular/core';

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
  score = 0; // New variable to track the score

  isGameStarted: boolean = false;
  isGameOver = false; // New variable to track game over state

  ngOnInit(): void {
    // Start the game loop only if isGameStarted is true
  }

  startGame() {
    this.isGameStarted = true;
    // Add any additional logic to start or reset your game here
    setInterval(() => this.updateGame(), 200); // Adjust the interval based on your preference
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

    // Check for collisions with the board edges (you can refine this logic)
    if (head.row < 0 || head.row >= this.gridSize || head.col < 0 || head.col >= this.gridSize) {
      // Game over logic (you can handle this based on your requirements)
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

    // Check for collisions with food (you can refine this logic)
    if (head.row === this.foodPosition.row && head.col === this.foodPosition.col) {
      // Handle snake eating food
      console.log('Snake ate the food!');

      // Generate a new random food position
      this.generateRandomFoodPosition();

      this.score += 10; // Adjust the score increment based on your preference
      // You can implement logic to increase the snake's length
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
    // Add any other game state resets if needed
    this.score = 0;
  }



}
