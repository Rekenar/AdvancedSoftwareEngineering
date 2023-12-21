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
  
  onStartClick() {
    this.menu=false;
    this.started = true;
  }

  onShowAttrClick(){
    this.menu=false;
    this.attr = true;
  }

  onBackClick(){
    this.started = false;
    this.attr = false;
    this.menu = true;
  }

}
