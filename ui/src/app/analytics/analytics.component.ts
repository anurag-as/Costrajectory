import { Component, OnInit } from '@angular/core';
import { Getdata } from '../upload-form/tabular-view/GetData.service';
import { GlobalConfigsService } from '../global-configs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { AuxillaryTasksService, Filter } from './auxillary-tasks.service';
import { group } from '@angular/animations';

interface BillData {
  username: string;
  TableEntries: [];
  ImageEntries: [];
}

interface Billdata {
  body: any[];
}

interface Status {
  message: string;
  uploadStatus: boolean;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  Timeline = '';
  Mode = 'Personal';
  Category = 'All';
  SharesPayload: any;
  Username: string;
  GroupIndex = 0;
  BillEntries: any;
  DataLoading = 'Started';
  UserName: string;
  FormData: BillData;
  GroupNames: any[] = [];
  // tslint:disable-next-line:variable-name
  Date_l_Personal: Date;
  // tslint:disable-next-line:variable-name
  Date_r_Personal: Date;
    // tslint:disable-next-line:variable-name
  Date_l_Shared: Date;
  // tslint:disable-next-line:variable-name
  Date_r_Shared: Date;

  // tslint:disable-next-line:variable-name
  Date_l_Personal_current: Date;
  // tslint:disable-next-line:variable-name
  Date_r_Personal_current: Date;
    // tslint:disable-next-line:variable-name
  Date_l_Shared_current: Date;
  // tslint:disable-next-line:variable-name
  Date_r_Shared_current: Date;

  PersonalDataCurrent: any;
  SharedDataCurrent: any;

  constructor(private DataGetter: Getdata, public globals: GlobalConfigsService, private http: HttpClient,
              private AuxillaryTasks: AuxillaryTasksService,
              private DataFilter: Filter) {
    this.Username = globals.GetUserName;
  }

  ngOnInit() {
    this.GetBills();
  }

  GetBills() {
    this.ReloadShares().subscribe(data => {
    this.SharesPayload = data.body;
    console.log('GROUP DATA HOME: ', data.body);
    this.GetPersonalBills();
    }, err => {
    this.SharesPayload = [];
    });
  }

  ReloadShares() {
    const endpoint = 'http://127.0.0.1:5000/group/viewGroup';
    const QueryPayload = {user_name : this.globals.GetUsername()};
    return this.http.post<Billdata>(endpoint, QueryPayload);
  }

  GetPersonalBills() {
    this.DataGetter.GetData( this.globals.GetUserName ).subscribe( data => {
      this.DataLoading = 'Success';
      this.BillEntries = data;
      this.GetDataRange();
      this.GetGroupNames();
      this.SharedDataCurrent = this.DateInterrupt( {Ldate: this.Date_l_Shared, rDate: this.Date_r_Shared});
      this.PersonalDataCurrent = this.DateInterrupt( {Ldate: this.Date_l_Personal, rDate: this.Date_r_Personal});
    }, err => {
      this.DataLoading = 'Fail';
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  GetGroupNames() {
    for ( const grp of this.SharesPayload) {
      this.GroupNames.push(grp.group_info.title);
    }
  }

  GetDataRange() {
    let DateData = this.AuxillaryTasks.GetMaxMinDatePersonal(this.BillEntries);
    this.Date_l_Personal = DateData.MinDate;
    this.Date_r_Personal = DateData.MaxDate;

    DateData = this.AuxillaryTasks.GetMaxMinDateShared(this.SharesPayload);
    this.Date_l_Shared = DateData.MinDate;
    this.Date_r_Shared = DateData.MaxDate;
  }

  DateInterrupt(Range: {Ldate: Date, rDate: Date}) {
    if ( this.Mode === 'Personal') {
      this.Date_l_Personal_current = Range.Ldate;
      this.Date_r_Personal_current = Range.rDate;
      const FIlterParams = {
        LDate :  this.Date_l_Personal_current,
        RDate : this.Date_r_Personal_current,
        Category : this.Category,
        Mode: this.Mode,
        SharedData: this.SharesPayload,
        PersonalData: this.BillEntries,
        GroupIdx: this.GroupIndex
      };
      this.PersonalDataCurrent = this.DataFilter.FilterData(FIlterParams);
      // console.log('DATE INTERRUPT: PERSONAL : ', this.PersonalDataCurrent);
    } else {
      this.Date_l_Shared_current = Range.Ldate;
      this.Date_r_Shared_current = Range.rDate;
      const FIlterParams = {
        LDate :  this.Date_l_Shared_current,
        RDate : this.Date_r_Shared_current,
        Category : this.Category,
        Mode: this.Mode,
        SharedData: this.SharesPayload,
        PersonalData: this.BillEntries,
        GroupIdx: this.GroupIndex
      };
      this.SharedDataCurrent = this.DataFilter.FilterData(FIlterParams);
      // console.log('DATE INTERRUPT: SHARED : ', this.SharedDataCurrent);

    }
  }

  ForceChangeData() {
    if ( this.Mode === 'Personal') {
      const FIlterParams = {
        LDate :  this.Date_l_Personal_current,
        RDate : this.Date_r_Personal_current,
        Category : this.Category,
        Mode: this.Mode,
        SharedData: this.SharesPayload,
        PersonalData: this.BillEntries,
        GroupIdx: this.GroupIndex
      };
      this.PersonalDataCurrent = this.DataFilter.FilterData(FIlterParams);
    } else {
      const FIlterParams = {
        LDate :  this.Date_l_Shared_current,
        RDate : this.Date_r_Shared_current,
        Category : this.Category,
        Mode: this.Mode,
        SharedData: this.SharesPayload,
        PersonalData: this.BillEntries,
        GroupIdx: this.GroupIndex
      };
      console.log('group index', this.GroupIndex);
      this.SharedDataCurrent = this.DataFilter.FilterData(FIlterParams);
    }
    console.log('THINGS CHANGED: ', this.SharedDataCurrent, this.PersonalDataCurrent);
  }

}

