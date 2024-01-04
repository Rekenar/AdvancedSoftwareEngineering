// snakegame.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-snakegame',
  templateUrl: './snakegame.component.html', // Use an external template file
  styles: []
})
export class SnakegameComponent {
  snakePosition: { row: number; col: number }[] = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 }
    // Initial snake positions, adjust as needed
  ];
  foodPosition: { row: number; col: number } = { row: 5, col: 5 }; // Initial food position

  // Logic for handling user input, updating snake position, and checking for collisions can go here
}
