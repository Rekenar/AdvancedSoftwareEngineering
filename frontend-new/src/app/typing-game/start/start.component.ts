import { Component , Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})


export class StartComponent {
  @Output() startGameClicked: EventEmitter<void> = new EventEmitter<void>();


    startGame(): void {
    this.startGameClicked.emit();
  }
}
