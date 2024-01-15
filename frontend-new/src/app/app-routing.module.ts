import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ConfirmSignUpComponent} from "./confirm-sign-up/confirm-sign-up.component";
import {AuthGuard} from "./auth.guard";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'users/register', component: ConfirmSignUpComponent},
  { path: 'users/reset-password', component: PasswordResetComponent},
  { path: 'users/change-password', component: ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
