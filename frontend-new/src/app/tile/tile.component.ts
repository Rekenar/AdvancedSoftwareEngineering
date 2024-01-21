import { Component, Input, OnInit } from '@angular/core';
import { MovieGuessrGamestateService } from 'src/app/services/movie-guessr-services/movie-guessr-gamestate.service';


@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements OnInit {
  constructor(public gameService: MovieGuessrGamestateService) {}

  @Input() hintName: String;
  @Input() hint: string;
  @Input() cost: number;
  @Input() coinCount: number;
  @Input() index!: number;

  backgroundColor: string;
  flipped = false;

  ngOnInit(): void {
    this.backgroundColor = this.getRandomPastelColor();
  }

  flipTile() {
    console.log(this.index)
    if (this.gameService.flipTile(this.index)) {
      this.flipped = true;
    }
  }

  getRandomPastelColor() {
    const base = 200; // Base color for pastel
    const color = () => Math.floor(base + Math.random() * 55); // Range: 200-255
    return `rgba(${color()}, ${color()}, ${color()}, ${0.9})`;
  }
}
