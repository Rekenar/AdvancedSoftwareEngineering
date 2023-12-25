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

  getCitySample (): Observable<object[]> {
    return this.http.get<object[]>(`${this.apiUrl}/almost/cities`, {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization' : 'Bearer ' + this.loginService.getToken()})});
  }

  getCapitalSample (): Observable<object[]> {
    return this.http.get<object[]>(`${this.apiUrl}/almost/capitals`, {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization' : 'Bearer ' + this.loginService.getToken()})});
  }

}
