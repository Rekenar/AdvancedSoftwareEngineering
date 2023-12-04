import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-almost-map',
  standalone: true,
  imports: [],
  templateUrl: './almost-map.component.html',
  styleUrl: './almost-map.component.css'
})
export class AlmostMapComponent {
  @Output() quitClick = new EventEmitter<void>();


  round:number=0;
  infoString:String = "Ready?";
  nextDisabled:Boolean = false;

  // 0 = Before start, 1 = game active, 2 = game ended
  status:number = 0;
  statusButton:Array<String> =  ["Start","Next","Restart"];


  timeLeftString: string ="10";


  nextClicked() {

  }

  quitClicked() {
    
    this.quitClick.emit();
    
  }

}
