import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const HTTP_OPTIONS = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    let data = {
      username: credentials.username,
      password: credentials.password
    }
    return this.http.post<any>(`${this.apiUrl}/users/login`, data, HTTP_OPTIONS);
  }

  register(credentials: any) {
    let data = {
      username: credentials.username,
      password: credentials.password
    }
    return this.http.post<any>(`${this.apiUrl}/users/register`, data, HTTP_OPTIONS);
  }

  confirmSignUp(token: string) {
    return this.http.put(`${this.apiUrl}/users/confirm-sign-up?token=${token}`, HTTP_OPTIONS);
  }
}
