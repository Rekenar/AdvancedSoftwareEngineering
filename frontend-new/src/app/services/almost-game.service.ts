import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

const HTTP_OPTIONS = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class AlmostGameService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http:HttpClient,private loginService:AuthService) { }

  getHeaders(){
    return {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization' : 'Bearer ' + this.loginService.getToken()})};
  }

  getCitySample (): Observable<object[]> {
    return this.http.get<object[]>(`${this.apiUrl}/almost/cities`, this.getHeaders());
  }

  getCapitalSample (): Observable<object[]> {
    return this.http.get<object[]>(`${this.apiUrl}/almost/capitals`, this.getHeaders());
  }

  postScore (score: number) {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("auth-token"));
    console.log(localStorage.getItem("auth-token"))
    return this.http.post<any>(`http://localhost:8080/scores/add/1/${score}`, null, {headers})
      .subscribe(response => {
        console.log(response); // Log the response
      });
  } 

}
