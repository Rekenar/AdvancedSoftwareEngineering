import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-almost-attr',
  standalone: true,
  imports: [],
  templateUrl: './almost-attr.component.html',
  styleUrl: './almost-attr.component.css'
})
export class AlmostAttrComponent {
  @Output() backClick = new EventEmitter<void>();

  backClicked(){
    this.backClick.emit();
  }
}
