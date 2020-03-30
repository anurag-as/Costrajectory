import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent implements OnInit {
  selected = 'profile';
  constructor() { }

  ngOnInit() {
  }

  ChangeMode(Mode: string) {
    this.selected = Mode;
  }


}
