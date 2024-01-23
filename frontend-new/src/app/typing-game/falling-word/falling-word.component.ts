import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-falling-word',
  templateUrl: './falling-word.component.html',
  styleUrls: ['./falling-word.component.css'],
  animations: [
    trigger('fall', [
      state('falling', style({
        transform: 'translateY(300px)',
        opacity: 0
      })),
      transition('void => falling', [
        style({
          transform: 'translateY(0)',
          opacity: 1
        }),
        animate('1000ms ease-out')
      ]),
    ])
  ]
})


export class FallingWordComponent {
  @Input() word: string = '';
  state: string = 'falling';
}
