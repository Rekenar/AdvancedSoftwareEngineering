import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../services/auth.service";
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private loginService: AuthService) { }

  login() {
    console.log('login pressed');
  

    this.loginService.hello().pipe(
      tap(response => {
        console.log('Data sent successfully:', response);
      }),
      catchError(error => {
        console.error('Error sending data:', error);
        throw error;
      })
    ).subscribe();
  }


}
