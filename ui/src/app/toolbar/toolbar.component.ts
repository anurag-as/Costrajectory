import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorage } from '../app.session';
import { GlobalConfigsService } from '../global-configs.service';

interface ReturnImage {
  Image: any;
}

interface PremiumStatus {
  isPremium: string;
}

interface GetG {
  body: [];
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
  GroupData: any;

  constructor(private http: HttpClient, private logout: SessionStorage, private Route: Router, private Globals: GlobalConfigsService) {}

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
    const endpoint = 'http://127.0.0.1:5000/isPremium';
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
    const endpoint = 'http://127.0.0.1:5000/profilePic';
    // const QueryPayload = {username: this.username, mapped_name : this.MappedImageName, original_name: this.ActualImageName};
    // console.log(QueryPayload);
    this.receiveImage(endpoint, this.userName.username).subscribe(data => {
      this.canShowImage = true;
      this.base64Data = data.Image;
    });
  }

  LogOut(path) {
    const endpoint = 'http://127.0.0.1:5000/signout';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        username: this.userName.username
      }
    };
    this.http.delete(endpoint, options).subscribe(data => {
      console.log('LOGGING OUT');
    });
    this.logout.deleteKey();
    window.location.reload();
  }

  GoPremium() {
    const endpoint = 'http://127.0.0.1:5000/goPremium';
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
      window.alert('SOMETHING WENT WRONG! TRY AGAIN LATER');
    });
  }

  GoToAccountDetails() {
    this.Route.navigate(['/AccDetails']);
  }

  GetAllGroupData() {
    this.GetAllGroupDataFromServer(this.userName).subscribe(data => {
      this.GroupData = data.body.body;
      // this.GroupData = [['3', 'delhi']];
      // console.log('ALL GROUP DATA: ', this.GroupData);
    });
  }

  GetAllGroupDataFromServer(UserName: string) {
    const endpoint = 'http://127.0.0.1:5000/pendingRequests';
    return this.http.get<GetG>(endpoint, {
        params: {
            user_name : UserName,
        },
        observe: 'response'
      });
  }

  DecisionPoster(DecisionDetails: {GroupId: number, Decision: string}) {
    console.log('DECISION GOT : ', DecisionDetails);
    this.PostDecision(DecisionDetails.GroupId, DecisionDetails.Decision);
  }

  PostDecision(GroupId: number, Decision: string) {
    const endpoint = 'http://127.0.0.1:5000/groupStatus';
    const templatePayload = [[String(GroupId), Decision]];
    this.http.post(endpoint, {payload: templatePayload}).subscribe(data => {
      this.GetAllGroupData();
    });
}

ParseInt(a, b) {
  return parseInt(a, b);
}

}
