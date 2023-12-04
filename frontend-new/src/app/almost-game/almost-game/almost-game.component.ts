import { Component } from '@angular/core';
import { AlmostStartComponent } from '../almost-start/almost-start.component';
import { AlmostMapComponent } from '../almost-map/almost-map.component';
import { AlmostAttrComponent } from '../almost-attr/almost-attr.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-almost-game',
  standalone: true,
  imports: [CommonModule,AlmostAttrComponent,AlmostMapComponent,AlmostStartComponent],
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
