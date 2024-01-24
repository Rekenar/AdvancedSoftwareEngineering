import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {BrowserModule} from "@angular/platform-browser";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {Game} from "../game.enum";

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [BrowserModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatToolbarModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent implements OnInit {
  private static id = 1;
  displayedColumns = ['id', 'username', 'game', 'score', 'date'];
  dataSource = new MatTableDataSource<Score>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getData().subscribe(data => {
      const scores = data.map(this.createScoreElement);
      this.dataSource = new MatTableDataSource(scores);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.sort.active = 'score'; // The property name of the column to be sorted
      this.sort.direction = 'asc'; // 'asc' for ascending, 'desc' for descending
    });
  }


  createScoreElement(data: ScoreDTO) {
    return {
      id: ScoreboardComponent.id++,
      game: data.gameName,
      username: data.username,
      score: data.score,
      date: data.recordedAt.slice(0, 10) + " / " + data.recordedAt.slice(11, 19)
    }
  }


  getData() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token"));
    return this.http.get<ScoreDTO[]>('http://localhost:8080/scores/all', {headers});
  }


  applyGameFilter(game: string) {
    this.dataSource.filterPredicate = (data: Score, filter: string) => {

      return data.game.toLowerCase() === filter.toLowerCase();
      
    };
    this.dataSource.filter = game.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected readonly Game = Game;
}


export interface ScoreDTO {
  gameName: string;
  username: string;
  score: number;
  recordedAt: string;
}

export interface Score {
  id: number;
  game: string;
  username: string;
  score: number;
  date: string;
}
