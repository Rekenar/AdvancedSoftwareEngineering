import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Game} from "../game.enum";
import {DataService} from "../services/data.service";



//@todo: Add List of Games as a rectangle with Preview image and Description and Highscore when hovering over it. When clicking on it, you get to the game
//@todo: Add Leaderboard for each game with Highscore and Name of Player and Date of Highscore

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrl: './content-area.component.css'
})
export class ContentAreaComponent {

    protected readonly Game = Game;

    sharedData: Game = Game.NoGame;
    constructor(private dataService: DataService) {}

    ngOnInit() {
      this.dataService.data$.subscribe(data => {
        this.sharedData = data;
      });
    }
}
