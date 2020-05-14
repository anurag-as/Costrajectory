import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorage } from '../app.session';
import { GlobalConfigsService } from '../global-configs.service';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GroupacceptpopupComponent } from './groupacceptpopup/groupacceptpopup.component';

interface ReturnImage {
  Image: any;
}

interface PremiumStatus {
  isPremium: string;
}

interface GetG {
  group_admin_approvals: { add: [], remove: [] };
  personal_requests: [];
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() userName;
  @Input() Authoriation;
  canShowImage = false;
  base64Data = '';
  isPremium = false;
  GroupData = [];
  RequestId = 0;
  PeopleAdd = [];
  PeopleRemove = [];
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private logout: SessionStorage, private Route: Router, private Globals: GlobalConfigsService, public dialog: MatDialog) {}

  ngOnInit() {
    // To get the random DP
    // this.GetDP();
    // this.GetUserPremiumStatus();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    if (chg.Authoriation === undefined) {
      return;
    }
    if (chg.Authoriation.currentValue === true) {
        this.GetUserPremiumStatus();
        this.GetDP();
        this.GetAllGroupData();
    }

  }

  receiveImage(URL: string, username: string) {
    return this.http.post<ReturnImage>(URL, {user_name: username});
  }

  private GetUserPremiumStatus() {
    const endpoint = 'http://127.0.0.1:5000/auth/isPremium';
    this.http.post<PremiumStatus>(endpoint, {username: this.userName.username}).subscribe(data => {
      // console.log('ON CHANGE ANGULAR : ', data, this.userName.username);
      if (data.isPremium === 'True') {
        this.isPremium = true;
        this.Globals.premium = this.isPremium;
      } else {
        this.isPremium = false;
        this.Globals.premium = this.isPremium;
      }
    }, err => {
      this.isPremium = false;
      this.Globals.premium = this.isPremium;
    });
    // return this.isPremium;
  }

  private GetDP() {
    const endpoint = 'http://127.0.0.1:5000/auth/profilePic';
    // const QueryPayload = {username: this.username, mapped_name : this.MappedImageName, original_name: this.ActualImageName};
    // console.log(QueryPayload);
    this.receiveImage(endpoint, this.userName.username).subscribe(data => {
      this.canShowImage = true;
      this.base64Data = data.Image;
    });
  }

  LogOut(path) {
    const endpoint = 'http://127.0.0.1:5000/auth/signout';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        username: this.userName.username
      }
    };
    this.http.delete(endpoint, options).subscribe(data => {
      // console.log('LOGGING OUT');
    });
    this.logout.deleteKey();
    window.location.reload();
  }

  GoPremium() {
    const endpoint = 'http://127.0.0.1:5000/auth/goPremium';
    this.http.post<PremiumStatus>(endpoint, {username: this.userName.username}).subscribe(data => {
      // console.log('ON CHANGE ANGULAR : ', data, this.userName.username);
      if (data.isPremium === 'True') {
        this.isPremium = true;
        this.Globals.premium = this.isPremium;
        window.location.reload();
      } else {
        this.Globals.premium = this.isPremium;
        window.alert('SOMETHING WENT WRONG! TRY AGAIN LATER');
      }
    }, err => {
      this.Globals.premium = this.isPremium;
      window.alert('SERVER BUSY! TRY AGAIN LATER');
    });
  }

  GoToAccountDetails() {
    this.Route.navigate(['/AccDetails']);
  }

  GetAllGroupData() {
    this.GetAllGroupDataFromServer(this.userName.username).subscribe(data => {
      this.GroupData = data.body.personal_requests;
      this.PeopleAdd = data.body.group_admin_approvals.add;
      this.PeopleRemove = data.body.group_admin_approvals.remove;
      // console.log('REQUESTS: ', this.GroupData, this.PeopleAdd, this.PeopleRemove);
      if ( typeof(this.GroupData) !== 'string' && this.GroupData !== undefined) {
        this.RequestId = 1;
        const dialogRef = this.dialog.open(GroupacceptpopupComponent, {
          panelClass: 'myapp-no-padding-dialog',
          width: '800px'
        });
        dialogRef.componentInstance.userName = this.userName;
        dialogRef.componentInstance.GroupData = this.GroupData;
        dialogRef.componentInstance.PeopleAdd = this.PeopleAdd;
        dialogRef.componentInstance.PeopleRemove = this.PeopleRemove;
      } else if (typeof(data.body.group_admin_approvals) !== 'string') {
        this.RequestId = 2;
      }
      // this.GroupData = [['3', 'delhi'], ['3', 'delhi']];
      // console.log('ALL GROUP DATA: ', this.GroupData);
    });
  }

  ChangeRequestType(request) {
    this.RequestId = request;
  }

  GetAllGroupDataFromServer(UserName: string) {
    const endpoint = 'http://127.0.0.1:5000/group/pendingRequests';
    // console.log('(((( ', UserName);
    return this.http.get<GetG>(endpoint, {
        params: {
            user_name : UserName,
        },
        observe: 'response'
      });
  }

  DecisionPoster(DecisionDetails: {GroupId: number, Decision: string}) {
    // console.log('DECISION GOT : ', DecisionDetails);
    // this.GetAllGroupData();
    this.PostDecision(DecisionDetails.GroupId, DecisionDetails.Decision);
  }

  PostDecision(GroupId: number, Decision: string) {
    const endpoint = 'http://127.0.0.1:5000/group/groupStatus';
    const templatePayload = [[String(GroupId), Decision]];
    this.http.post(endpoint, {group_status: templatePayload, user_name: this.userName.username}).subscribe(data => {
      this.GetAllGroupData();
    });
}

ParseInt(a, b) {
  return parseInt(a, b);
}

}
