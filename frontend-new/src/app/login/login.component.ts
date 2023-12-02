import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {catchError, tap} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  // Hide the password input
  hide = true;

  constructor(private loginService: AuthService, public formBuilder: FormBuilder) { }

  login() {

    const dataToSend = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.loginService.login(dataToSend).pipe(
      tap(response => {
        console.log('Data sent successfully:', response);
      }),
      catchError(error => {
        console.error('Error sending data:', error);
        throw error;
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    }, {validator: [ this.emailValidator]});
  }

  emailValidator(group: FormGroup): { [key: string]: any } | null {
    const email = group.get('username')?.value;

    if (!email) {
      return null; // Do not validate if email is not provided
    }

    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (pattern.test(email)) {
      return null;
    } else {
      return { ['invalidEmail']: true };
    }
  }


}
