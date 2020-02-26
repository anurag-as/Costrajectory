import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorage } from '../app.session';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() userName;
  @Input() Authoriation;


  constructor(private http: HttpClient, private logout: SessionStorage, private Route: Router) {}

  ngOnInit() {
  }
  
  test() {
    console.log('HERE');
    this.http.get('http://127.0.0.1:5000/getAlluserNames').subscribe(posts => { console.log(posts); });
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
