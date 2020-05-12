import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Input, Output } from '@angular/core';
import { GroupOperationsService } from '../group-operations.service';


@Component({
  selector: 'app-delete-users-shared-bill',
  templateUrl: './delete-users-shared-bill.component.html',
  styleUrls: ['./delete-users-shared-bill.component.css']
})
export class DeleteUsersSharedBillComponent implements OnInit {
  deletedParticipants: string[] = [];
  ParticipantsFiltered: string[] = [];
  @Input() Username: string;
  @Input() PendingUsers: string[];
  @Input() Admin: string;
  @Input() Participants: string[];
  @Input() GroupId: number;
  @Input() isAdminMODE = true;

  constructor(private http: HttpClient,
              private dialogRef: MatDialogRef<DeleteUsersSharedBillComponent>,
              private GroupOperations: GroupOperationsService) { }

  ngOnInit() {
    for (const i of this.Participants) {
      if ( i !== this.Admin && i !== this.Username) {
        this.ParticipantsFiltered.push(i);
      }
    }
  }

  private closeDialog() {
    this.dialogRef.close();
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
    // console.log( this.deletedParticipants, this.Participants);
  }

  DeleteUsersFromGroup() {
    this.GroupOperations.deleteUsersFromGroup(this.GroupId, this.Username, this.deletedParticipants, !this.isAdminMODE).subscribe(data => {
      this.closeDialog();
    });
  }

}
