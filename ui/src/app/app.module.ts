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
import { GlobalConfigsService } from './global-configs.service';
import { ViewTableBillComponent } from './view-table-bill/view-table-bill.component';
import { ChangeBillComponent } from './view-table-bill/change-bill/change-bill.component';
import { ViewBillComponent } from './view-table-bill/view-bill/view-bill.component';
import { DeleteBillComponent } from './view-table-bill/delete-bill/delete-bill.component';
import { EditBillComponent } from './view-table-bill/edit-bill/edit-bill.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';



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
    TabularViewComponent,
    ViewTableBillComponent,
    ChangeBillComponent,
    ViewBillComponent,
    DeleteBillComponent,
    EditBillComponent,
    AnalyticsComponent
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
    AngularFontAwesomeModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  providers: [TabularViewComponent, GlobalConfigsService],
  bootstrap: [AppComponent],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [AddBillsComponent, ChangeBillComponent, ViewBillComponent, DeleteBillComponent, EditBillComponent],
})
export class AppModule { }
