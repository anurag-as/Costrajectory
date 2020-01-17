import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SignupinComponent } from './signupin/signupin.component';
import { SignupComponent } from './signupin/signup/signup.component';
import { SigninComponent } from './signupin/signin/signin.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card'
import {UploadFormComponent} from './upload-form/upload-form.component';
import { FileSelectDirective } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    SignupinComponent,
    SignupComponent,
    SigninComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatCardModule,
    FileSelectDirective
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
