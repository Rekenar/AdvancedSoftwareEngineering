import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { TopBarComponent } from './top-bar/top-bar.component';

import { AlmostGameComponent } from './almost-game/almost-game/almost-game.component';
import { AlmostMapComponent } from './almost-game/almost-map/almost-map.component';
import { AlmostStartComponent } from './almost-game/almost-start/almost-start.component';
import { AlmostAttrComponent } from './almost-game/almost-attr/almost-attr.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {SnakegameModule} from "./snakegame/snakegame.module";
import { AlmostModeComponent } from './almost-game/almost-mode/almost-mode.component';
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContentAreaComponent,
    TopBarComponent,
    AlmostGameComponent,
    AlmostAttrComponent,
    AlmostStartComponent,
    AlmostMapComponent,
    AlmostModeComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    SnakegameModule,
    LeafletModule,
    ScoreboardComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
