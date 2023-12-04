import { Component,Output,EventEmitter } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet'; 



@Component({
  selector: 'app-almost-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './almost-map.component.html',
  styleUrl: './almost-map.component.css'
})
export class AlmostMapComponent {
  @Output() quitClick = new EventEmitter<void>();

  map!: L.Map;

  round:number=0;
  infoString:String = "Ready?";
  nextDisabled:Boolean = false;

  // 0 = Before start, 1 = game active, 2 = game ended
  status:number = 0;
  statusButton:Array<String> =  ["Start","Next","Restart"];


  timeLeftString: string ="10";

  //onClick functions 

  nextClicked() {

  }

  quitClicked() {
    
    this.quitClick.emit();
    
  }

  ngOnInit() {
    this.map = L.map('map').setView([55.00, 15.00], 4);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom:8
    }).addTo(this.map);

    this.addClickable(this.map);

    // this.marker = L.marker([51.505, -0.09], { icon: this.myIcon }).addTo(this.map);
  }

  addClickable(map:L.Map){

  }

}
