import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TypingService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http:HttpClient,private loginService:AuthService) { }

  getAllWords (): Observable<object[]> {
    return this.http.get<object[]>(`${this.apiUrl}/typing/words`, {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization' : 'Bearer ' + this.loginService.getToken()})});
  }

  getWord (): Observable<object> {
    return this.http.get<object>(`${this.apiUrl}/typing/word`, {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization' : 'Bearer ' + this.loginService.getToken()})});
  }

  postScore (score:number){
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token"));
    console.log(localStorage.getItem("auth-token"))
    return this.http.post<any>(`http://localhost:8080/scores/add/2/${score}`, null, {headers})
      .subscribe(response => {
        console.log(response); // Log the response
      });

  }

}

export class CommunicationService {
  private resultClickSource = new Subject<void>();

  resultClick$ = this.resultClickSource.asObservable();

  emitResultClick(): void {
    this.resultClickSource.next();
  }
}
