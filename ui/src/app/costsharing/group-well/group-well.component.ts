import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { GroupOperationsService } from './group-operations.service';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { AddUsersSharedBillComponent } from './add-users-shared-bill/add-users-shared-bill.component';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteUsersSharedBillComponent } from './delete-users-shared-bill/delete-users-shared-bill.component';
import { ShareSettlementComponent } from './share-settlement/share-settlement.component';

interface Validity {
  username: string;
  password: string;
  available: boolean;
  message: string;
}


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
  @Input() GroupCreationTime: any;
  @Output() ChangeEvent = new EventEmitter();
  @Input() PendingUsers: string[];
  @Input() Description;
  deletedParticipants: string[] = [];
  NEXTADMIN = '';
  NEXTADMINVALID = false;
  IntermediateArray: string[];
  @Input() ParticipantsCopy: string[];
  FormattedStringId: string;
  success = false;
  divs: number[] = [0];
  valid: boolean[] = new Array(100).fill(false);
  StartVerification = false;
  inVerification = false;
  DoneVerification = false;
  currentDiv: number;
  currentUsername: string;
  IntimationMessage: string;
  FormattedDate: any;
  error = false;
  constructor(private GroupOperations: GroupOperationsService,
              private http: HttpClient,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.FormattedStringId = String(this.GroupId);
    this.FormattedDate = new Date(Math.trunc(this.GroupCreationTime));
    // console.log('++++++++++++ ', this.PendingUsers);
  }

  ResetAddUsersData() {
    this.divs = [0];
    this.valid = new Array(100).fill(false);
    this.StartVerification = false;
    this.inVerification = false;
    this.DoneVerification = false;
    this.currentDiv = -1;
    this.currentUsername = '';
  }

  DeleteGroup() {
    this.GroupOperations.deleteGroup(this.GroupId, this.Username).subscribe(data => {
      this.ChangeEvent.emit();
    });
  }

  AddUsersToGroup(f: NgForm) {
    // console.log('ADDING');
    this.GroupOperations.AddUsersToGroup(this.GroupId, this.Username, this.ConvertParticipantsToArray(f), this.Admin).subscribe(data => {
      this.ChangeEvent.emit();
    });
  }

  DeleteUsersFromGroup() {
    this.GroupOperations.deleteUsersFromGroup(this.GroupId, this.Username, this.deletedParticipants, this.Admin).subscribe(data => {
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

  ExitGroupAdmin() {
    this.GroupOperations.ChangeGroupAdmin(this.GroupId, this.Username, this.NEXTADMIN).subscribe(data => {
      this.GroupOperations.ExitFromGroup(this.GroupId, this.Username).subscribe(result => {
        this.ChangeEvent.emit();
      });
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
    // console.log( this.deletedParticipants, this.Participants);
  }

  ResetParticipants() {
    this.Participants = [ ...this.Participants, ...this.deletedParticipants];
    this.deletedParticipants = [];
    // console.log('RESET: ', this.Participants);
  }

  createDiv(): void {
    this.divs.push(this.divs.length + 1);
  }

  deleteDiv(divId: number): void {
    const index = this.divs.indexOf(divId);
    if (index > -1) {
      this.divs.splice(index, 1);
    }
  }

  CheckValidity(divId: number): void {
    const index = this.divs.indexOf(divId);
    this.valid[index] = true;
  }

  DivIdtoIndex(divId: number): number {
    return this.divs.indexOf(divId);
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
    const QueryPayload = {username : user, password: 'NOTHING', group_id: String(this.GroupId)};
    return this.http.post<Validity>(endpoint, QueryPayload);
  }

  RefreshData() {
    this.ChangeEvent.emit();
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

  AddUsersToGroupDialogAdminMode(): void {
    const dialogRef = this.dialog.open(AddUsersSharedBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '700px'
    });
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.Admin = this.Admin;
    dialogRef.componentInstance.PendingUsers = this.PendingUsers;
    dialogRef.componentInstance.isAdminMODE = true;
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.RefreshData();
    });
  }

  AddUsersToGroupDialogNonAdminMode(): void {
    const dialogRef = this.dialog.open(AddUsersSharedBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '700px'
    });
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.Admin = this.Admin;
    dialogRef.componentInstance.PendingUsers = this.PendingUsers;
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.isAdminMODE = false;
    dialogRef.afterClosed().subscribe(result => {
       // console.log('The dialog was closed');
      // this.RefreshData();
    });
  }

  DeleteUsersToGroupDialogAdminMode(): void {
    const dialogRef = this.dialog.open(DeleteUsersSharedBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '700px'
    });
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.Admin = this.Admin;
    dialogRef.componentInstance.PendingUsers = this.PendingUsers;
    dialogRef.componentInstance.isAdminMODE = true;
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.RefreshData();
    });
  }

  DeleteUsersToGroupDialogNonAdminMode(): void {
    const dialogRef = this.dialog.open(DeleteUsersSharedBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '700px'
    });
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.Admin = this.Admin;
    dialogRef.componentInstance.PendingUsers = this.PendingUsers;
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.isAdminMODE = false;
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.RefreshData();
    });
  }

    Settlements(): void {
      const dialogRef = this.dialog.open(ShareSettlementComponent, {
        panelClass: 'myapp-no-padding-dialog'
      });
      // dialogRef.componentInstance.GroupId = this.GroupId;
      dialogRef.afterClosed().subscribe(result => {
      });
    }
}
