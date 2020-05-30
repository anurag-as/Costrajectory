import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupinComponent } from './signupin/signupin.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import {AppComponent} from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { TabularViewComponent } from './upload-form/tabular-view/tabular-view.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { CostsharingComponent } from './costsharing/costsharing.component';
import { AboutComponent } from './accountdetails/about/about.component';
import { DevelopersComponent } from './accountdetails/developers/developers.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
   { path: 'logout', component: SignupinComponent},
   { path: '', component: TabularViewComponent},
   { path: 'analytics', component: AnalyticsComponent},
   { path: 'AccDetails', component: AccountdetailsComponent},
   { path: 'CostSharing', component: CostsharingComponent},
   { path: 'About', component: AboutComponent},
   { path: 'AboutUs', component: DevelopersComponent},
   { path: 'Home', component: HomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
