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
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.gameService.initializeGame();
    this.gameService.coinCount = 10;
    this.options = quizzesData.map((quiz) => quiz.title);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onInputSubmitted(userInput: string | null): void {
    if (userInput !== null) {
      //const isCorrect = this.gameService.checkCorrectFilmName(userInput);
/*
      if (isCorrect) {
        // User's input is correct, load a new quiz and award 5 coins
        this.gameService.roundCount++;
        this.gameService.initializeGame(); // Load a new quiz
        this.gameService.coinCount += 5; // Award 5 coins
      } else {
        // Handle incorrect input (optional)
      }*/

      // Clear the input field
      this.gameService.checkGuess(userInput);
      this.myControl.setValue('');
    }
  }
}
