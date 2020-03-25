import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-signupin',
  templateUrl: './signupin.component.html',
  styleUrls: ['./signupin.component.css']
})
export class SignupinComponent implements OnInit {
  signup = false;
  @Output() userdata = new EventEmitter<{username: string, password: string}>();

  constructor() { }

  ngOnInit() {
  }

  private changeState() {
    if (this.signup) {
      this.signup = false;
    } else {
      this.signup = true;
    }
  }

  private authorization(loginDetails: {username: string , password: string}) {
     // console.log(loginDetails.username, loginDetails.password);
     this.userdata.emit({username: loginDetails.username, password: loginDetails.password});
  }
}

