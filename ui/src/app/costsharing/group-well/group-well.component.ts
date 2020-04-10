import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { GroupOperationsService } from './group-operations.service';

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
  @Output() ChangeEvent = new EventEmitter();
  deletedParticipants: string[] = [];
  NEXTADMIN = '';
  NEXTADMINVALID = false;
  IntermediateArray: string[];

  constructor(private GroupOperations: GroupOperationsService) { }

  ngOnInit() {
    console.log(this.Username, this.Admin, this.deletedParticipants, this.Participants);
  }

  DeleteGroup() {
    this.GroupOperations.deleteGroup(this.GroupId, this.Username).subscribe(data => {
      this.ChangeEvent.emit();
    });
  }

  AddUsersToGroup() {
    this.ChangeEvent.emit();
  }

  DeleteUsersFromGroup() {
    this.GroupOperations.deleteUsersFromGroup(this.GroupId, this.Username, this.deletedParticipants).subscribe(data => {
      this.ChangeEvent.emit();
    });
  }

  MakeOthersAdmin() {
    this.GroupOperations.ChangeGroupAdmin(this.GroupId, this.Username, this.NEXTADMIN).subscribe(data => {
      this.ChangeEvent.emit();
    });
  }

  ExitGroupNonAdmin() {
    this.GroupOperations.ExitFromGroup(this.GroupId, this.Username).subscribe(data => {
      this.ChangeEvent.emit();
    });
  }

  ExitGroup() {
    this.GroupOperations.ExitFromGroup(this.GroupId, this.Username, this.NEXTADMIN).subscribe(data => {
      this.ChangeEvent.emit();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    console.log( this.deletedParticipants, this.Participants);
  }

}
