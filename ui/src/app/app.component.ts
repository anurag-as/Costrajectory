import { Component, OnInit } from '@angular/core';
import { SessionStorage } from './app.session';
import { GlobalConfigsService } from './global-configs.service';
import { Title } from '@angular/platform-browser';

interface TokenData {
  key: string ;
  username: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'UI';
  userdata: any = undefined;
  authorizationDone = false;
  hasKey = false;
  userTokenData: TokenData;
  progress = 78;

  constructor(private sessionStorageclient: SessionStorage, public globals: GlobalConfigsService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Costrajectory');
    if (this.sessionStorageclient.hasKey() === false) {
      // this.sessionStorageclient.setKey('test', 'value');
      // console.log('NO CURRENT SESSIONS');
    } else {
      this.userTokenData = this.sessionStorageclient.getKey();
      this.sessionStorageclient.ValidateToken(this.userTokenData.key, this.userTokenData.username).subscribe(
        res => {
          // res.validity = true;
          this.userdata = {username: this.userTokenData.username};
          // console.log(',,,,', res);
          if (res.valid) {
            // console.log('TOKEN AUTHENTICATED');
            this.globals.UserName = this.userdata.username;
            this.authorizationDone = true;
          } else {
            return;
          }
        }
      );
      // this.userdata = {username: 'test@t.com'};
      // this.authorizationDone = true;
      this.authorizationDone = false;
    }
  }

  private authorization(loginDetails: {username: string , password: string}) {
    // console.log(loginDetails.username, loginDetails.password);
    this.userdata = loginDetails;
    // console.log(this.userdata);
    this.globals.UserName = this.userdata.username;
    this.authorizationDone = true;
 }
}



