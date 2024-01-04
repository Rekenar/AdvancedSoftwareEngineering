// board.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() gridSize = 20;
  @Input() snakePosition: { row: number, col: number }[] = [{ row: 0, col: 0 }];
  @Input() foodPosition: { row: number, col: number } = { row: 5, col: 5 };

  getRows(): number[] {
    return Array.from({ length: this.gridSize }, (_, index) => index);
  }

  getColumns(): number[] {
    return Array.from({ length: this.gridSize }, (_, index) => index);
  }

  isSnakeCell(row: number, col: number): boolean {
    return this.snakePosition.some(pos => pos.row === row && pos.col === col);
  }

  isFoodCell(row: number, col: number): boolean {
    return this.foodPosition.row === row && this.foodPosition.col === col;
  }
}
