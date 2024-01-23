import { Component } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-start-game-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './start-game-dialog.component.html',
  styleUrl: './start-game-dialog.component.css'
})
export class StartGameDialogComponent {

}
