import {Component, OnInit} from '@angular/core';
import {TileComponent} from "../tile/tile.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {map, Observable, startWith} from "rxjs";
import { MovieGuessrGamestateService } from 'src/app/services/movie-guessr-services/movie-guessr-gamestate.service';
import {MatButtonModule} from "@angular/material/button";
import { HttpClient } from '@angular/common/http';

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
    MatButtonModule,
  ],
  templateUrl: './movie-guessr.component.html',
  styleUrl: './movie-guessr.component.css'
})
export class MovieGuessrComponent implements OnInit{
  constructor(public gameService: MovieGuessrGamestateService, private http: HttpClient) {}

  tiles = Array.from({ length: 9 }, (_, i) => i + 1);

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {

    this.http.get('assets/data/movies.txt', { responseType: 'text' }).subscribe(
      (data) => {
        // Split the contents into an array of movie titles
        this.options = data.split('\n');
        // Set up filtering for the autocomplete
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            if (value && value.length >= 3) {
              return this._filter(value);
            } else {
              return [];
            }
          })
        );
      },
      (error) => {
        console.error('Error reading movie titles:', error);
      }
    );

    this.gameService.initializeGame();
    this.gameService.coinCount = 10;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onInputSubmitted(userInput: string | null): void {
    if (userInput !== null) {
      this.gameService.checkGuess(userInput);
      this.myControl.setValue('');
    }
  }
}
