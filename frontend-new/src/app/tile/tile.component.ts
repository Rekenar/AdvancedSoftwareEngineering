import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements OnInit {
  @Input() hintName: String;
  @Input() hint: string; // Define the hint property with @Input
  backgroundColor: string;
  flipped = false;

  ngOnInit(): void {
    this.backgroundColor = this.getRandomPastelColor();
  }

  flipTile() {
    this.flipped = !this.flipped;
  }

  getRandomPastelColor() {
    const base = 200; // Base color for pastel
    const color = () => Math.floor(base + Math.random() * 55); // Range: 200-255
    return `rgb(${color()}, ${color()}, ${color()})`;
  }
}
