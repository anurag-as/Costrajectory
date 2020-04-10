import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GlobalConfigsService } from '../global-configs.service';
import { AddGroupBillComponent } from './add-group-bill/add-group-bill.component';
import { AddGroupContainerComponent } from './add-group-container/add-group-container.component';
import {HttpClient} from '@angular/common/http';

interface Billdata {
  body: any[];
}
@Component({
  selector: 'app-costsharing',
  templateUrl: './costsharing.component.html',
  styleUrls: ['./costsharing.component.css']
})
export class CostsharingComponent implements OnInit {
  GroupList: any[];
  username: string;
  constructor(public dialog: MatDialog, private Globals: GlobalConfigsService, private http: HttpClient) {
    this.username = this.Globals.GetUserName;
   }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
   // this.GroupList = [['rohitp2512@gmail.com', 'test', '', '', ['a', 'b', 'c', 'rohitp2512@gmail.com']], ['Admin', 'test2', '', '', ''], ['Admin', 'test3', '', '', '']];
    this.ReloadPage().subscribe(data => {
      console.log('GROUP DATA: ', data);
      this.GroupList = data.body;
    }, err => {
      this.GroupList = [];
    });
  }

  addGroupBill(): void {
    const dialogRef = this.dialog.open(AddGroupBillComponent, {
      width: '800px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUserName;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ');
      this.ReloadPage().subscribe(data => {
        this.GroupList = data.body;
      }, err => {
        this.GroupList = [];
      });
    });
  }

  ReloadPage() {
    const endpoint = 'http://127.0.0.1:5000/viewGroup';
    const QueryPayload = {user_name : this.username};
    return this.http.post<Billdata>(endpoint, QueryPayload);
  }

  ReloadAllData() {
    console.log('CHANGE DATA');
    this.ReloadPage().subscribe(data => {
      this.GroupList = data.body;
    }, err => {
      this.GroupList = [];
    });
  }

  addGroupContainer(): void {
    const dialogRef = this.dialog.open(AddGroupContainerComponent, {
      width: '1300px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUserName;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
