import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import * as moment from "moment";

const HTTP_OPTIONS = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
const AUTH_TOKEN_KEY = 'auth-token';
const EXPIRATION_KEY = 'expiration';
const USER_ID_KEY = 'user-id';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  // show if sign up successful
  isSignUpSuccessful = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    let data = {
      username: credentials.username,
      password: credentials.password
    }
    console.log(data)
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

  get isLoggedIn(): boolean {
    return this.getToken() !== null && moment().isBefore(this.getExpiration());
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getExpiration() {
    const expiration = localStorage.getItem(EXPIRATION_KEY);

    // @ts-ignore
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  logout() {
    localStorage.removeItem(EXPIRATION_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.router.navigate(['login']);

  }
}
