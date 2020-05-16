import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-group-accept',
  templateUrl: './group-accept.component.html',
  styleUrls: ['./group-accept.component.css']
})
export class GroupAcceptComponent implements OnInit {
  @Input() GroupName;
  @Input() GroupID;
  @Input() RequestType = 1; // 1 -> group , 2-> Add, 3-> Remove
  @Output() decision = new EventEmitter<{GroupId: number, Decision: string, RequestType: number, UserUnderConsideration: string}>();
  @Input() UserToBeAddedOrRemoved: string;

  constructor() { }

  ngOnInit() {
  }

  Accept() {
    // tslint:disable-next-line:max-line-length
    this.decision.emit({GroupId: this.GroupID, Decision: 'accepted', RequestType: this.RequestType, UserUnderConsideration: this.UserToBeAddedOrRemoved});
  }

  Reject() {
    // tslint:disable-next-line:max-line-length
    this.decision.emit({GroupId: this.GroupID, Decision: 'rejected', RequestType: this.RequestType, UserUnderConsideration: this.UserToBeAddedOrRemoved});
  }

}
