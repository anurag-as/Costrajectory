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
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { ProfileComponent } from './accountdetails/profile/profile.component';
import { AboutComponent } from './accountdetails/about/about.component';
import { LogsComponent } from './accountdetails/logs/logs.component';
import { ContactComponent } from './accountdetails/contact/contact.component';
import { StatusComponent } from './accountdetails/status/status.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { TermsComponent } from './accountdetails/terms/terms.component';
import { PrivacyComponent } from './accountdetails/privacy/privacy.component';
import { SupportComponent } from './accountdetails/support/support.component';
import {MatTableModule} from '@angular/material/table';
import { CostsharingComponent } from './costsharing/costsharing.component';
import { AddGroupBillComponent } from './costsharing/add-group-bill/add-group-bill.component';
import { AddGroupContainerComponent } from './costsharing/add-group-container/add-group-container.component';


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
    AnalyticsComponent,
    AccountdetailsComponent,
    ProfileComponent,
    AboutComponent,
    LogsComponent,
    ContactComponent,
    StatusComponent,
    TermsComponent,
    PrivacyComponent,
    SupportComponent,
    CostsharingComponent,
    AddGroupBillComponent,
    AddGroupContainerComponent
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
    MatMenuModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    DragDropModule,
    MonacoEditorModule.forRoot(),
    MatTableModule
    ],
  providers: [TabularViewComponent, GlobalConfigsService],
  bootstrap: [AppComponent],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AddBillsComponent,
    ChangeBillComponent,
    ViewBillComponent,
    DeleteBillComponent,
    EditBillComponent,
    AddGroupBillComponent,
    AddGroupContainerComponent],
})
export class AppModule { }
