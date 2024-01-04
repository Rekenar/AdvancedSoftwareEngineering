// snakegame.component.ts
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-snakegame',
  templateUrl: './snakegame.component.html',
  styleUrls: ['./snakegame.component.css']
})
export class SnakegameComponent {
  gridSize = 20;
  snakePosition: { row: number, col: number }[] = [{ row: 0, col: 0 }];
  foodPosition: { row: number, col: number } = { row: 5, col: 5 };
  direction: 'up' | 'down' | 'left' | 'right' = 'right'; // Initial direction

  ngOnInit(): void {
    // Start the game loop
    setInterval(() => this.updateGame(), 500); // Adjust the interval based on your preference
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.direction = 'up';
        break;
      case 'ArrowDown':
        this.direction = 'down';
        break;
      case 'ArrowLeft':
        this.direction = 'left';
        break;
      case 'ArrowRight':
        this.direction = 'right';
        break;
    }
  }

  updateGame(): void {
    // Update snake position based on the current direction
    const head = { ...this.snakePosition[0] };
    switch (this.direction) {
      case 'up':
        head.row -= 1;
        break;
      case 'down':
        head.row += 1;
        break;
      case 'left':
        head.col -= 1;
        break;
      case 'right':
        head.col += 1;
        break;
    }

    // Add the new head to the front of the snake
    this.snakePosition.unshift(head);

    // Check for collisions with the board edges (you can refine this logic)
    if (head.row < 0 || head.row >= this.gridSize || head.col < 0 || head.col >= this.gridSize) {
      // Game over logic (you can handle this based on your requirements)
      console.log('Game Over - Collision with board edges');
    }

    // Check for collisions with food (you can refine this logic)
    if (head.row === this.foodPosition.row && head.col === this.foodPosition.col) {
      // Handle snake eating food
      console.log('Snake ate the food!');
      // You can implement logic to generate a new food position and increase the snake's length
    } else {
      // Remove the tail if the snake hasn't eaten food
      this.snakePosition.pop();
    }
  }
}
