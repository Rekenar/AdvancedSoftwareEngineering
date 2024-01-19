import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit {

  resetPasswordForm: FormGroup;
  emailSent: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.resetPasswordForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword(): void {
    //console.log("reset pw clicked")
    if (!this.resetPasswordForm.valid || this.emailSent) {
      //console.log("form valid")
      return;
    }
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe();
    this.emailSent = true;
  }
}
