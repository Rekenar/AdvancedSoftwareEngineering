import { Component,Output,EventEmitter } from '@angular/core';
import * as L from 'leaflet'; 



@Component({
  selector: 'app-almost-map',
  standalone: true,
  imports: [],
  templateUrl: './almost-map.component.html',
  styleUrl: './almost-map.component.css'
})
export class AlmostMapComponent {
  @Output() quitClick = new EventEmitter<void>();

  map!: L.Map;
  marker?: L.Marker;
  myIcon = L.icon({
    iconUrl: '../../../assets/images/marker.png',
    iconSize: [30, 30],
  });

  round:number=0;
  infoString:String = "Ready?";
  curCityData:any = {};
  nextDisabled:Boolean = false;

  // 0 = Before start, 1 = game active, 2 = game ended
  status:number = 0;
  statusButton:Array<String> =  ["Start","Next","Restart"];
  activeRound:Boolean = false;


  timeLeftString: string ="10";
  timeLeft: number = 10;
  timerInterval: any;

  exampleCities = [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          19.82,
          41.33
        ]
      },
      "properties": {
        "capital": "Tirana",
        "country": "Albania"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          1.52,
          42.51
        ]
      },
      "properties": {
        "capital": "Andorra la Vella",
        "country": "Andorra"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          16.37,
          48.21
        ]
      },
      "properties": {
        "capital": "Vienna",
        "country": "Austria"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          27.57,
          53.9
        ]
      },
      "properties": {
        "capital": "Minsk",
        "country": "Belarus"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          4.35,
          50.85
        ]
      },
      "properties": {
        "capital": "Brussels",
        "country": "Belgium"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          18.36,
          43.85
        ]
      },
      "properties": {
        "capital": "Sarajevo",
        "country": "Bosnia and Herzegovina"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          23.32,
          42.7
        ]
      },
      "properties": {
        "capital": "Sofia",
        "country": "Bulgaria"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          15.98,
          45.81
        ]
      },
      "properties": {
        "capital": "Zagreb",
        "country": "Croatia"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          33.37,
          35.17
        ]
      },
      "properties": {
        "capital": "Nicosia",
        "country": "Cyprus"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          14.42,
          50.09
        ]
      },
      "properties": {
        "capital": "Prague",
        "country": "Czech Republic"
      }
    }
  ];


  // Timer functions 

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        let tmp = Math.round((this.timeLeft - 0.1) * 10) / 10;
        let tmpstring = tmp.toFixed(1);
        this.timeLeftString = tmpstring;
        this.timeLeft = parseFloat(tmpstring);
      } else {
        this.pauseTimer(false);
      }
    }, 100);
  }

  pauseTimer(reset: boolean) {
    clearInterval(this.timerInterval);
    if (reset){
      this.timeLeft=10;
    }else{
      this.timeLeft=0;
    }
  }


  //onClick functions 

  nextClicked() {
    this.status = 1;
    this.activeRound = true;
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.startTimer();
    this.curCityData = this.exampleCities[this.round]
    this.infoString = "City: " + this.curCityData.properties.capital;
    this.nextDisabled = true;
    this.round++;
    this.map.setView([55.00, 15.00], 4);
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
    map.on('click', (e) => {  
      if(this.activeRound){
        if(this.marker){
            map.removeLayer(this.marker);
        }
        let popLocation= e.latlng;
        console.log(popLocation);
        this.marker = L.marker(e.latlng,{icon:this.myIcon});
        map.addLayer(this.marker);
        
        this.nextDisabled = false;
        this.activeRound = false;

        this.pauseTimer(true);
      }
      if(this.round == 10){

        this.status = 2;

        this.round = 0;
      }
    });
  }


}
