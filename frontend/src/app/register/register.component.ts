import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {catchError, tap} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';


  constructor(private registerService: AuthService) {
  }

  register() {

    console.log('Registering with username:', this.username, 'email:', 'and password:', this.password);

    const dataToSend = {
      username: this.username,
      password: this.password
    };

    this.registerService.register(dataToSend).pipe(
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
