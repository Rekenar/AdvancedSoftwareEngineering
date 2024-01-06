import { Component } from '@angular/core';

@Component({
  selector: 'app-almost-game',
  templateUrl: './almost-game.component.html',
  styleUrl: './almost-game.component.css'
})
export class AlmostGameComponent {

  menu = true;
  started = false;
  attr = false;
  mode = false;
  modeData:object;
  
  onStartClick() {
    this.menu=false;
    this.mode=true;
  }

  onShowAttrClick(){
    this.menu=false;
    this.attr = true;
  }

  onBackClick(){
    this.started = false;
    this.attr = false;
    this.mode = false;
    this.menu = true;
  }

  onModeClick(modeData:object){
    this.mode=false;
    this.modeData = modeData;
    this.started = true;
  }


}
