import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TopBarComponent} from "./top-bar/top-bar.component";
import {ContentAreaComponent} from "./content-area/content-area.component";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopBarComponent, ContentAreaComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'minigames-hub';
}
