import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {catchError, tap} from "rxjs";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';

  signUpForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
    recaptchaReactive: [null, [Validators.required]],
  }, {validator: [this.emailValidator, this.passwordMatchValidator]} as AbstractControlOptions);



  constructor(private registerService: AuthService,
              private formBuilder: FormBuilder) {
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

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      recaptchaReactive: [null, [Validators.required]],
    }, {validator: [ this.emailValidator, this.passwordMatchValidator]});
  }

  emailValidator(group: FormGroup): { [key: string]: any } | null {
    const email = group.get('username')!.value;
    if (!email) {
      return null; // Do not validate if email is not provided
    }

    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email) ? null : { 'invalidEmail': true };
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

}
