import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Game} from "../game.enum";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<Game>(Game.NoGame);
  public data$ = this.dataSubject.asObservable();

  updateData(newValue: Game) {
    this.dataSubject.next(newValue);
  }
}
