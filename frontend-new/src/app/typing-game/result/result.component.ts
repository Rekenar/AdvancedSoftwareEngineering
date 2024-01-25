import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  mistakes = 0;
  wordPerMinute = 0;
  accuracy = 0;
  score = 0;
  @Input() gameData: any[] = [];
  @Output() restartGameClicked: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.gameData && this.gameData.length > 0) {
      // Loop through each item in the gameData array
      this.gameData.forEach(data => {
        // Update variables based on the properties in each data object
        if (data.totalScore !== undefined) {
          this.score += data.totalScore;
        }
        if (data.mistakes !== undefined) {
          this.mistakes += data.mistakes;
        }
        if (data.wordPerminute !== undefined) {
          this.wordPerMinute += data.wordPerminute;
        }
        if (data.accuracy !== undefined) {
          this.accuracy += data.accuracy;
        }
      });
     }
  }

  restartGameClick(): void {
    this.restartGameClicked.emit();
  }


}
