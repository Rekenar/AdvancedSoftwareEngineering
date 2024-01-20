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
  tiles = Array.from({ length: 9 }, (_, i) => i + 1);

  myControl = new FormControl('');
  options: string[] = ['Star Wars', 'LOTR', 'Shrek'];
  filteredOptions: Observable<string[]>;
  selectedMovie: any; // Store the selected movie object
  selectedQuizIndex: number = 0; // Initialize with the first movie (you can change this for randomness)

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    const movies: any[] = quizzesData;
    // Generate a random index to select a quiz
    this.selectedQuizIndex = Math.floor(Math.random() * movies.length);

    // Assign the selected quiz to the property
    this.selectedMovie = movies[this.selectedQuizIndex];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
