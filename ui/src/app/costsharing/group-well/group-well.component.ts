import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-group-well',
  templateUrl: './group-well.component.html',
  styleUrls: ['./group-well.component.css']
})
export class GroupWellComponent implements OnInit {
  @Input() Admin: string;
  @Input() Participants: string[];
  @Input() Bills: any[];
  @Input() GroupName: string;
  @Input() GroupId: number;
  @Input() Username: string;
  constructor() { }

  ngOnInit() {
    console.log(this.Username, this.Admin);
  }

  DeleteGroup() {}

  AddUsersToGroup() {}

  DeleteUsersFromGroup() {}

  MakeOthersAdmin() {}

  ExitGroup() {}

}
