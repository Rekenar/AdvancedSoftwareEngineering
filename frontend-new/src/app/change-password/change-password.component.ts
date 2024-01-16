import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {throwError} from "rxjs";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  passwordChanged: boolean = false;
  token: string;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute) {
    this.changePasswordForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: [null, Validators.required]
    }, {
      validator: [this.passwordMatchValidator('newPassword', 'confirmNewPassword')]} as AbstractControlOptions);

    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];
      });
  }

  changePassword(): void {
    if (!this.changePasswordForm.valid) {
      return;
    }

    this.authService.changePassword(this.changePasswordForm.value, this.token).subscribe({
      next: () => {
        this.passwordChanged = true;
      },
      error: (error) => {
        console.log(error)
        this.errorMessage = 'Token not valid, please try requesting a new email again';
      }
    });
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
        confirmPasswordControl.setErrors({['mustMatch']: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }
}
