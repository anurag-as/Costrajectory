import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupinComponent } from './signupin/signupin.component';


const routes: Routes = [   { path: '**', component: SignupinComponent} ];

// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
