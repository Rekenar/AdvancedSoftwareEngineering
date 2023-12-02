import { Component } from '@angular/core';
import {Game} from "../game.enum";
import {DataService} from "../services/data.service";
import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  protected readonly Game = Game;
  constructor(private dataService: DataService, private authService: AuthService) {}


  updateData(data: Game) {
    this.dataService.updateData(data);
  }

  logout() {
    this.authService.logout();
  }
}
