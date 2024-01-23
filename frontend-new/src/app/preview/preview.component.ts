import { Component } from '@angular/core';
import {Game} from "../game.enum";
import {DataService} from "../services/data.service";



//todo: Add List of Games as a rectangle with Preview image and Description and Highscore when hovering over it. When clicking on it, you get to the game
//todo: Give them a border and a hover effect
//todo: Four games per row

//todo: Games: [Asteroid, dinosaurGame, Snake, ...]
@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  protected readonly Game = Game;
  constructor(private dataService: DataService) {}


  updateData(data: Game) {
    this.dataService.updateData(data);
  }

}
