import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-game-over-dialog',
  standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule
    ],
  templateUrl: './game-over-dialog.component.html',
  styleUrl: './game-over-dialog.component.css'
})
export class GameOverDialogComponent {

}
