import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupinComponent } from './signupin/signupin.component';
import { UploadFormComponent } from './upload-form/upload-form.component';

const routes: Routes = [
   { path: 'login', component: SignupinComponent},
   { path: '**', component: SignupinComponent},
   { path: 'main', component: UploadFormComponent}
  ];

// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
