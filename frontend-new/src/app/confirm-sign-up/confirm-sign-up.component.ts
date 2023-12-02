import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FormBuilder} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {catchError, tap} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-confirm-sign-up',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.css'
})
export class ConfirmSignUpComponent implements OnInit {

  // SignUp  token
  token = "";

  // show if confirm sign up failed
  isConfirmSignUpFailed = false;

  constructor(private route: ActivatedRoute,
              public authService: AuthService,
              public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];
      });

    this.authService.confirmSignUp(this.token).pipe(
      tap(response => {
        console.log('Data sent successfully:', response);
        // successful sign up
        this.isConfirmSignUpFailed = false;
      }),
      catchError(error => {
        console.error('Error sending data:', error);
        // failed sign up
        this.isConfirmSignUpFailed = true;
        throw error;
      })
    )
      .subscribe();
  }
}
