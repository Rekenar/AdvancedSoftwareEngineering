import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieGuessrService {

  constructor(private http:HttpClient) { }
  postScore (score: number) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token"));
    console.log(localStorage.getItem("auth-token"))
    return this.http.post<any>(`http://localhost:8080/scores/add/2/${score}`, null, {headers})
      .subscribe(response => {
        console.log(response); // Log the response
      });
  }
}
