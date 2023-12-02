import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {catchError, tap} from "rxjs";
import {environment} from "../../environments/environment";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  username: string = '';
  password: string = '';
  sitekey = environment.siteKey;
  signUpForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
    recaptchaReactive: [null, [Validators.required]],
  }, {validator: [ this.emailValidator, this.passwordMatchValidator('password', 'confirmPassword')]} as AbstractControlOptions);

  // Hide the password input
  hide = true;



  constructor(private registerService: AuthService,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  /*register() {
    const dataToSend = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
    };

    console.log('Registering with: ' +  JSON.stringify(dataToSend));

    this.registerService.register(this.signUpForm.value);
  }*/

  register() {

    console.log('Registering with username:', this.username, 'email:', 'and password:', this.password);

    const dataToSend = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
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
    }, {validator: [ this.emailValidator, this.passwordMatchValidator('password', 'confirmPassword')]} as AbstractControlOptions);

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
  passwordMatchValidator(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[passwordKey];
      const confirmPasswordControl = formGroup.controls[confirmPasswordKey];

      // check if controls are available
      if (!passwordControl || !confirmPasswordControl) {
        return null; // Return null if controls are not available
      }

      // check if another validator has already found an error on the confirmPasswordControl
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return null;
      }

      // Set error on confirmPasswordControl if validation fails
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ ['mustMatch']: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }

      return null;
    };
  }


}
