import { Component } from '@angular/core';
import {Game} from "../game.enum";
import {DataService} from "../services/data.service";
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  protected readonly Game = Game;
  constructor(private dataService: DataService) {}


  updateData(data: Game) {
    this.dataService.updateData(data);
  }
}
