import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-confirm-sign-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.css'
})
export class ConfirmSignUpComponent implements OnInit{

  constructor(private route: ActivatedRoute,
    public authService: AuthService,
    public formBuilder: FormBuilder) {
}

  ngOnInit(): void {
    console.log("hello")
  }

}
