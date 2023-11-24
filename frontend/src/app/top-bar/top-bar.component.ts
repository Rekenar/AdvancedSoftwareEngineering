import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {DataService} from "../services/data.service";
import {Game} from "../game.enum";
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
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
