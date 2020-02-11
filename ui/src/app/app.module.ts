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
import {MatCardModule} from '@angular/material/card';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { IconbarComponent } from './upload-form/iconbar/iconbar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddBillsComponent } from './upload-form/add-bills/add-bills.component';
import { LogoutComponent } from './logout/logout.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TabularViewComponent } from './upload-form/tabular-view/tabular-view.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    SignupinComponent,
    SignupComponent,
    SigninComponent,
    UploadFormComponent,
    IconbarComponent,
    AddBillsComponent,
    LogoutComponent,
    TabularViewComponent
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
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule
  ],
  providers: [TabularViewComponent],
  bootstrap: [AppComponent],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [AddBillsComponent],
})
export class AppModule { }
