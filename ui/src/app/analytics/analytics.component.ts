import { Component, OnInit } from '@angular/core';
import { Getdata } from '../upload-form/tabular-view/GetData.service';
import { GlobalConfigsService } from '../global-configs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { AuxillaryTasksService } from './auxillary-tasks.service';

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
  Timeline = 'Week';
  Mode = 'Personal';
  Category = 'All';
  SharesPayload: any;
  Username: string;

  BillEntries = [];
  DataLoading = 'Started';
  UserName: string;
  FormData: BillData;

  constructor(private DataGetter: Getdata, public globals: GlobalConfigsService, private http: HttpClient,
              private AuxillaryTasks: AuxillaryTasksService) {
    this.Username = globals.GetUserName;
  }

  ngOnInit() {
    this.GetPersonalBills();
    this.GetPersonalShares();
  }

  GetPersonalShares() {
    this.ReloadShares().subscribe(data => {
    this.SharesPayload = data.body;
    console.log('GROUP DATA HOME: ', data.body);
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
      console.log('MAIN DATA : ', data);
      this.DataLoading = 'Success';
      this.FormData = data;
      if (typeof(data.TableEntries) === 'undefined' ) {
        return;
      }
      for ( const entry of data.TableEntries) {
        if (entry.Identifier !== 'False') {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            true,
            entry.Identifier,
            data.ImageEntries[entry.Identifier],
            entry.uid,
            entry.category
          ]);
        } else {
          this.BillEntries.push([
            this.BillEntries.length + 1,
            entry.Name,
            entry.Description,
            entry.Date,
            entry.Amount,
            false,
            entry.Identifier,
            undefined,
            entry.uid,
            entry.category
          ]);
        }
      }
      console.log('BILLS : ', this.BillEntries);
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

}

