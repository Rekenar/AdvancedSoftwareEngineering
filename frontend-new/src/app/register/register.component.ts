import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
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
