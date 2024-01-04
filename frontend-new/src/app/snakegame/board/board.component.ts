// board.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() snakePosition: { row: number, col: number }[];
  @Input() foodPosition: { row: number, col: number };

  gridSize = 20;

  ngOnInit() {
    // Additional initialization logic if needed
  }

  getRows(): number[] {
    return Array(this.gridSize).fill(0).map((_, index) => index);
  }

  getColumns(): number[] {
    return Array(this.gridSize).fill(0).map((_, index) => index);
  }

  isSnakeCell(row: number, col: number): boolean {
    return this.snakePosition.some(pos => pos.row === row && pos.col === col);
  }

  isFoodCell(row: number, col: number): boolean {
    return this.foodPosition.row === row && this.foodPosition.col === col;
  }
}
