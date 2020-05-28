import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GlobalConfigsService } from '../global-configs.service';
import { AddGroupBillComponent } from './add-group-bill/add-group-bill.component';
import { AddGroupContainerComponent } from './add-group-container/add-group-container.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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
  constructor(public dialog: MatDialog, private Globals: GlobalConfigsService, private http: HttpClient, private route: Router) {
    this.username = this.Globals.GetUserName;
   }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
   // this.GroupList = [['rohitp2512@gmail.com', 'test', '', '', ['a', 'b', 'c', 'rohitp2512@gmail.com']], ['Admin', 'test2', '', '', ''], ['Admin', 'test3', '', '', '']];
   this.ReloadPage().subscribe(data => {
    this.GroupList = data.body;
    // console.log('GROUP DATA: ', data.body);
    this.Globals.getUsageQuota().subscribe(Quota => {
    this.Globals.maxQuota = Quota.TotalQuota;
    this.Globals.usageQuota = Quota.UsedQuota;
    this.Globals.usageQuota = Math.min(Math.round((this.Globals.usageQuota + Number.EPSILON) * 100) / 100 , Quota.TotalQuota);
    });
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
      // console.log('The dialog was closed ');
      this.ReloadPage().subscribe(data => {
        this.GroupList = data.body;
        // console.log('GROUP DATA: ', data.body);
        this.Globals.getUsageQuota().subscribe(Quota => {
        this.Globals.maxQuota = Quota.TotalQuota;
        this.Globals.usageQuota = Quota.UsedQuota;
        this.Globals.usageQuota = Math.min(Math.round((this.Globals.usageQuota + Number.EPSILON) * 100) / 100 , Quota.TotalQuota);
        });
      }, err => {
        this.GroupList = [];
      });
    });
  }

  ReloadPage() {
    const endpoint = 'http://127.0.0.1:5000/group/viewGroup';
    const QueryPayload = {user_name : this.username};
    return this.http.post<Billdata>(endpoint, QueryPayload);
  }

  ReloadAllData() {
      this.ReloadPage().subscribe(data => {
      this.GroupList = data.body;
      // console.log('GROUP DATA: ', data.body);
      this.Globals.getUsageQuota().subscribe(Quota => {
      this.Globals.maxQuota = Quota.TotalQuota;
      this.Globals.usageQuota = Quota.UsedQuota;
      this.Globals.usageQuota = Math.min(Math.round((this.Globals.usageQuota + Number.EPSILON) * 100) / 100 , Quota.TotalQuota);
      });
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
      // console.log('The dialog was closed');
    });
  }

  NavigateToHome() {
    this.route.navigate(['CostSharing']);
  }


}
