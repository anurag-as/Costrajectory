import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorage } from '../app.session';

interface ReturnImage {
  Image: any;
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

  constructor(private http: HttpClient, private logout: SessionStorage, private Route: Router) {}

  ngOnInit() {
    // To get the random DP
    this.GetDP();
  }

  receiveImage(URL: string) {
    return this.http.get<ReturnImage>(URL);
  }

  private GetDP() {
    const endpoint = 'http://127.0.0.1:5000/profilePic';
    // const QueryPayload = {username: this.username, mapped_name : this.MappedImageName, original_name: this.ActualImageName};
    // console.log(QueryPayload);
    this.receiveImage(endpoint).subscribe(data => {
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
}
