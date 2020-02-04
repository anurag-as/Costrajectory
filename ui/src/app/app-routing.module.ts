import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupinComponent } from './signupin/signupin.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import {AppComponent} from './app.component'
import { LogoutComponent } from './logout/logout.component'

const routes: Routes = [
   { path: 'logout', component:SignupinComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
