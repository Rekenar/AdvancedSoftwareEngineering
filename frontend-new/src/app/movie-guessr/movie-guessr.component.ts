import {Component, OnInit} from '@angular/core';
import {TileComponent} from "../tile/tile.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {map, Observable, startWith} from "rxjs";
import quizzesData from './quizzes.json'; // Import the JSON file
import { MovieGuessrGamestateService } from 'src/app/services/movie-guessr-services/movie-guessr-gamestate.service';

@Component({
  selector: 'app-movie-guessr',
  standalone: true,
  imports: [
    TileComponent,
    MatGridListModule,
    NgForOf,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './movie-guessr.component.html',
  styleUrl: './movie-guessr.component.css'
})
export class MovieGuessrComponent implements OnInit{
  constructor(public gameService: MovieGuessrGamestateService) {}

  tiles = Array.from({ length: 9 }, (_, i) => i + 1);

  myControl = new FormControl('');
  options: string[] = ['Star Wars', 'LOTR', 'Shrek'];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.gameService.initializeGame();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
