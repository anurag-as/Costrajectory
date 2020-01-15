import { Component, OnInit } from '@angular/core';
import { SessionStorage } from './app.session';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UI';
  userdata: any = undefined;
  authorizationDone = false;
  hasKey = false;

  constructor(private sessionStorageclient: SessionStorage) {}

  ngOnInit() {
    if(this.sessionStorageclient.hasKey() == false) {
      this.sessionStorageclient.setKey('test','value');
      console.log('NO CURRENT SESSIONS');
    } else {
      this.sessionStorageclient.getKey();
      this.userdata = {username: 'test@t.com',password: 'test@123'};
      // this.authorizationDone = true;
      this.authorizationDone = false;
    }
  }

  private authorization(loginDetails: {username: string , password: string}) {
    // console.log(loginDetails.username, loginDetails.password);
    this.userdata = loginDetails;
    console.log(this.userdata);
    this.authorizationDone = true;
 }
}



