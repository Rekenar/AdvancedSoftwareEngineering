import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-almost-mode',
  templateUrl: './almost-mode.component.html',
  styleUrl: './almost-mode.component.css'
})
export class AlmostModeComponent {
  @Output() modeClick = new EventEmitter<{ earth: boolean, capitals: boolean }>();
  view1:boolean = true; // if initial view should be rendered
  earth:boolean; // true = earth, false = blank
  capitals:boolean;  // true = capitals, false = cities

  setMode(earth:boolean){
    this.earth = earth;
    this.view1 = false;
  }

  setDifficulty(capitals:boolean){
    this.capitals = capitals;
    this.modeClick.emit({earth:this.earth,capitals:this.capitals});
  }
}
