// snakegame.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakegameComponent } from './snakegame.component';
import { BoardComponent } from './board/board.component';
import { SnakeComponent } from './snake/snake.component';
import { FoodComponent } from './food/food.component';

@NgModule({
  declarations: [
    SnakegameComponent,
    BoardComponent
  ],
  imports: [CommonModule, SnakeComponent, FoodComponent],
  exports: [SnakegameComponent, BoardComponent, SnakeComponent, FoodComponent] // Export components if used outside the module
})
export class SnakegameModule { }
