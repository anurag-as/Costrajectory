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

const routes: Routes = [
   { path: 'logout', component: SignupinComponent},
   { path: '', component: TabularViewComponent},
   { path: 'analytics', component: AnalyticsComponent},
   { path: 'AccDetails', component: AccountdetailsComponent},
   { path: 'CostSharing', component: CostsharingComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
