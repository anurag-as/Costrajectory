import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorage } from '../app.session';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() userName;
  @Input() Authoriation;


  constructor(private http: HttpClient, private logout:SessionStorage, private Route:Router) {}

  ngOnInit() {
  }
  
  test() {
    console.log('HERE');
    this.http.get('http://127.0.0.1:5000/getAlluserNames').subscribe(posts => { console.log(posts); });
  }

  LogOut(path) {
    this.logout.deleteKey();
    window.location.reload();
  }
}
