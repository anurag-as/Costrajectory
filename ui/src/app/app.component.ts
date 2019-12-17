import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';
  userdata: any = undefined;
  authorizationDone = false;

  private authorization(loginDetails: {username: string , password: string}) {
    // console.log(loginDetails.username, loginDetails.password);
    this.userdata = loginDetails;
    console.log(this.userdata);
    this.authorizationDone = true;
 }


}
