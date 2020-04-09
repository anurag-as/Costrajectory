import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-accept',
  templateUrl: './group-accept.component.html',
  styleUrls: ['./group-accept.component.css']
})
export class GroupAcceptComponent implements OnInit {
  @Input() GroupName;
  @Input() GroupID;
  @Output() decision = new EventEmitter<{GroupId: number, Decision: string}>();

  constructor() { }

  ngOnInit() {
  }

  AcceptGroup() {
    this.decision.emit({GroupId: this.GroupID, Decision: 'accepted'});
  }

  RejectGroup() {
    this.decision.emit({GroupId: this.GroupID, Decision: 'rejected'});
  }

}
