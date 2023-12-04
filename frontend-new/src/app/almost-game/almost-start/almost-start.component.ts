import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-almost-start',
  standalone: true,
  imports: [],
  templateUrl: './almost-start.component.html',
  styleUrl: './almost-start.component.css'
})
export class AlmostStartComponent {
  @Output() startClick = new EventEmitter<void>();
  @Output() attrClick = new EventEmitter<void>();


  startClicked() {
    this.startClick.emit();
  }

  showAttributionsClicked() {
    this.attrClick.emit();
  }
}
