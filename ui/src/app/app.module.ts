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
import { GroupWellComponent } from './costsharing/group-well/group-well.component';
import { GroupAcceptComponent } from './toolbar/group-accept/group-accept.component';
import { AddSharedBillComponent } from './costsharing/add-shared-bill/add-shared-bill.component';
import { BillCounterComponent } from './costsharing/AddSharedBill/bill-counter/bill-counter.component';
import { IndivisualBillComponent } from './costsharing/group-well/indivisual-bill/indivisual-bill.component';
import { ResizableModule } from 'angular-resizable-element';
import { CopyBillComponent } from './costsharing/group-well/indivisual-bill/copy-bill/copy-bill.component';
import { BillInfoComponent } from './costsharing/group-well/indivisual-bill/bill-info/bill-info.component';
// tslint:disable-next-line:max-line-length
import { DeleteGroupIndivisualBillComponent } from './costsharing/group-well/indivisual-bill/delete-group-indivisual-bill/delete-group-indivisual-bill.component';
// tslint:disable-next-line:max-line-length
import { ViewGroupIndivisualBillComponent } from './costsharing/group-well/indivisual-bill/view-group-indivisual-bill/view-group-indivisual-bill.component';
// tslint:disable-next-line:max-line-length
import { EditGroupIndivisualBillComponent } from './costsharing/group-well/indivisual-bill/edit-group-indivisual-bill/edit-group-indivisual-bill.component';
import { FooterComponent } from './footer/footer.component';
import { BugreportComponent } from './footer/bugreport/bugreport.component';
import { Title } from '@angular/platform-browser';
import { GoogleChartsModule } from 'angular-google-charts';
import { GroupacceptpopupComponent } from './toolbar/groupacceptpopup/groupacceptpopup.component';
import { DevelopersComponent } from './accountdetails/developers/developers.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { ErrorfloatComponent } from './utilities/errorfloat/errorfloat.component';
import { SuccessfloatComponent } from './utilities/successfloat/successfloat.component';
import { AddUsersSharedBillComponent } from './costsharing/group-well/add-users-shared-bill/add-users-shared-bill.component';
import { DeleteUsersSharedBillComponent } from './costsharing/group-well/delete-users-shared-bill/delete-users-shared-bill.component';
import { ShareSettlementComponent } from './costsharing/group-well/share-settlement/share-settlement.component';
import { ShareOweComponent } from './costsharing/group-well/share-settlement/share-owe/share-owe.component';
// tslint:disable-next-line:max-line-length
import { ShareSettlementHistoryComponent } from './costsharing/group-well/share-settlement/share-settlement-history/share-settlement-history.component';
import { ShareOthersComponent } from './costsharing/group-well/share-settlement/share-others/share-others.component';
import { AliasHolderComponent } from './utilities/alias-holder/alias-holder.component';
import { RandomcolorModule } from 'angular-randomcolor';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './home/timeline/timeline.component';
import { RecentBillsComponent } from './home/recent-bills/recent-bills.component';
import { RecentSharesComponent } from './home/recent-shares/recent-shares.component';
import { DotPointerComponent } from './utilities/dot-pointer/dot-pointer.component';
import { LineComponent } from './utilities/line/line.component';
import { DotlineComponent } from './utilities/homecomp/dotline/dotline.component';
import { DotlineInfoComponent } from './utilities/homecomp/dotline-info/dotline-info.component';
import { DotlineInfoDownComponent } from './utilities/homecomp/dotline-info-down/dotline-info-down.component';
import { DotlineDownComponent } from './utilities/homecomp/dotline-down/dotline-down.component';
import { InfoRectUpComponent } from './utilities/homecomp/info-rect-up/info-rect-up.component';
import { InfoRectDownComponent } from './utilities/homecomp/info-rect-down/info-rect-down.component';
import { DotPointerDotUPComponent } from './utilities/homecomp/dot-pointer-dot-up/dot-pointer-dot-up.component';
import { DotPointerDotDOWNComponent } from './utilities/homecomp/dot-pointer-dot-down/dot-pointer-dot-down.component';
import { MiniOweInterfaceComponent } from './home/recent-shares/mini-owe-interface/mini-owe-interface.component';
import { MiniBillInterfaceComponent } from './home/recent-bills/mini-bill-interface/mini-bill-interface.component';
import { ViewAddedBillComponent } from './BillInterface/view-added-bill/view-added-bill.component';
import { DeleteAddedBillComponent } from './BillInterface/delete-added-bill/delete-added-bill.component';
import { CloneAddedBillComponent } from './BillInterface/clone-added-bill/clone-added-bill.component';
import { EditAddedBillComponent } from './BillInterface/edit-added-bill/edit-added-bill.component';
import { InfoAddedBillComponent } from './BillInterface/info-added-bill/info-added-bill.component';
import { TestComponent } from './analytics/test/test.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TimeSliderComponent } from './analytics/time-slider/time-slider.component';
import { PieChartComponent } from './analytics/pie-chart/pie-chart.component';
import { PredictorChartComponent } from './analytics/predictor-chart/predictor-chart.component';
import { DiffChartComponent } from './analytics/diff-chart/diff-chart.component';
import { LineChartComponent } from './analytics/line-chart/line-chart.component';
import { Filter, AuxillaryTasksService} from './analytics/auxillary-tasks.service';

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
    AddGroupContainerComponent,
    GroupWellComponent,
    GroupAcceptComponent,
    AddSharedBillComponent,
    BillCounterComponent,
    IndivisualBillComponent,
    CopyBillComponent,
    BillInfoComponent,
    DeleteGroupIndivisualBillComponent,
    ViewGroupIndivisualBillComponent,
    EditGroupIndivisualBillComponent,
    FooterComponent,
    BugreportComponent,
    GroupacceptpopupComponent,
    DevelopersComponent,
    UtilitiesComponent,
    ErrorfloatComponent,
    SuccessfloatComponent,
    AddUsersSharedBillComponent,
    DeleteUsersSharedBillComponent,
    ShareSettlementComponent,
    ShareOweComponent,
    ShareSettlementHistoryComponent,
    ShareOthersComponent,
    AliasHolderComponent,
    HomeComponent,
    TimelineComponent,
    RecentBillsComponent,
    RecentSharesComponent,
    DotPointerComponent,
    LineComponent,
    DotlineComponent,
    DotlineInfoComponent,
    DotlineInfoDownComponent,
    DotlineDownComponent,
    InfoRectUpComponent,
    InfoRectDownComponent,
    DotPointerDotUPComponent,
    DotPointerDotDOWNComponent,
    MiniOweInterfaceComponent,
    MiniBillInterfaceComponent,
    ViewAddedBillComponent,
    DeleteAddedBillComponent,
    CloneAddedBillComponent,
    EditAddedBillComponent,
    InfoAddedBillComponent,
    TestComponent,
    TimeSliderComponent,
    PieChartComponent,
    PredictorChartComponent,
    DiffChartComponent,
    LineChartComponent
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
    MatTableModule,
    ResizableModule,
    GoogleChartsModule,
    RandomcolorModule,
    Ng5SliderModule
    ],
  providers: [TabularViewComponent, GlobalConfigsService, Title, Filter, AuxillaryTasksService],
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
    AddGroupContainerComponent,
    CopyBillComponent,
    DeleteGroupIndivisualBillComponent,
    EditGroupIndivisualBillComponent,
    BillInfoComponent,
    BugreportComponent,
    GroupacceptpopupComponent,
    AddUsersSharedBillComponent,
    DeleteUsersSharedBillComponent,
    ShareSettlementComponent,
    ViewAddedBillComponent,
    DeleteAddedBillComponent,
    CloneAddedBillComponent,
    EditAddedBillComponent,
    InfoAddedBillComponent
    ],
})
export class AppModule { }
