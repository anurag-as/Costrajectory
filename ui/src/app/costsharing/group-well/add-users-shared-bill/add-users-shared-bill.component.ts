import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { GroupOperationsService } from '../group-operations.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';


interface Validity {
  username: string;
  available: boolean;
  message: string;
}


@Component({
  selector: 'app-add-users-shared-bill',
  templateUrl: './add-users-shared-bill.component.html',
  styleUrls: ['./add-users-shared-bill.component.css']
})
export class AddUsersSharedBillComponent implements OnInit {
  currentDiv: number;
  currentUsername: string;
  IntimationMessage: string;
  divs: number[] = [0];
  StartVerification = false;
  valid: boolean[] = new Array(100).fill(false);
  success = false;
  error = false;

  @Input() Username: string;
  @Output() ChangeEvent = new EventEmitter();
  @Input() PendingUsers: string[];
  @Input() Admin: string;
  @Input() Participants: string[];
  @Input() GroupId: number;
  @Input() isAdminMODE = true;

  constructor(private GroupOperations: GroupOperationsService,
              private http: HttpClient,
              private dialogRef: MatDialogRef<AddUsersSharedBillComponent>) { }

  ngOnInit() {
    console.log('ADD USERS: ', this.isAdminMODE);
  }

  Verify(divId: number, name: string) {
    this.currentDiv = divId;
    this.currentUsername = name;
    const index = this.DivIdtoIndex(divId);
    this.VerifyUser(name).subscribe(data => {
      this.StartVerification = true;
      // tslint:disable-next-line:max-line-length
      this.valid[this.currentDiv] = data.available && (this.currentUsername !== this.Username) && (!this.Participants.includes(name)) && (!this.PendingUsers.includes(name) && data.message !== 'User has rejected the group too many times');
      this.StartVerification = false;
      if (this.valid[this.currentDiv]) {
        this.success = true;
        this.IntimationMessage = 'User Available to be added';
        // this.IntimationMessage = 'User has rejected the group many times';
      } else {
        if (this.Participants.includes(name)) {
          this.error = true;
          // tslint:disable-next-line:quotemark
          this.IntimationMessage = "User already a member of group";
        } else if (this.PendingUsers.includes(name)) {
          this.error = true;
          // tslint:disable-next-line:quotemark
          this.IntimationMessage = "User is already invited";
        } else if (this.currentUsername === this.Username) {
          this.error = true;
          // tslint:disable-next-line:quotemark
          this.IntimationMessage = "You can't add Yourself";
        } else if ( data.message === 'User has rejected the group too many times') {
          this.error = true;
          // tslint:disable-next-line:quotemark
          this.IntimationMessage = "User rejected the group";
        } else {
          this.error = true;
          this.IntimationMessage = 'No Username';
        }
      }
      this.FloatedIntimation();
    });
  }

  VerifyUser(user: string) {
    const endpoint = 'http://127.0.0.1:5000/auth/checkUser';
    const QueryPayload = {username : user, password: 'NOTHING'};
    return this.http.post<Validity>(endpoint, QueryPayload);
  }

  DivIdtoIndex(divId: number): number {
    return this.divs.indexOf(divId);
  }

  FloatedIntimation(): void {
    // show box msg
    // wait 3 Seconds and hide
    setTimeout(function() {
        this.success = false;
        this.error = false;
        // console.log(this.edited);
    }.bind(this), 6000);
   }

   AddUsersToGroup(f: NgForm) {
    // console.log('ADDING');
    // tslint:disable-next-line:max-line-length
    this.GroupOperations.AddUsersToGroup(this.GroupId, this.Username, this.ConvertParticipantsToArray(f), this.Admin, !this.isAdminMODE).subscribe(data => {
      this.dialogRef.close();
    });
  }

  ConvertParticipantsToArray(f: NgForm) {
    const participantsOfTheGroup = [];
    for ( let i = 0; i < 100 ; i++) {
      if ( this.valid[i] ) {
        if (i === 0) {
          participantsOfTheGroup.push(f.value['0']);
        } else {
          participantsOfTheGroup.push(f.value[i]);
        }
      }
    }
    // console.log('PARTICIPANTS: ', participantsOfTheGroup);
    return participantsOfTheGroup;
  }

  deleteDiv(divId: number): void {
    const index = this.divs.indexOf(divId);
    if (index > -1) {
      this.divs.splice(index, 1);
    }
  }

  createDiv(): void {
    this.divs.push(this.divs.length + 1);
  }

  private closeDialog() {
    this.dialogRef.close();
  }

}
