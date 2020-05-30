import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-shares',
  templateUrl: './recent-shares.component.html',
  styleUrls: ['./recent-shares.component.css']
})
export class RecentSharesComponent implements OnInit {
  testAlias = {
    'a@a.com': {alias: 'aa', name: false},
    'b@b.com': {alias: 'bb', name: false},
    'c@c.com': {alias: 'cc', name: false}
    };
  Share = ['c@c.com', 'b@b.com', 400];
  constructor() { }

  ngOnInit() {
  }

}
