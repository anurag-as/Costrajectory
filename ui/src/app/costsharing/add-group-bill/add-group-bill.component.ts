import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

interface Validity {
  username: string;
  password: string;
  available: boolean;
}


@Component({
  selector: 'app-add-group-bill',
  templateUrl: './add-group-bill.component.html',
  styleUrls: ['./add-group-bill.component.css']
})
export class AddGroupBillComponent implements OnInit {
  username = '';
  divs: number[] = [0];
  valid: boolean[] = new Array(100).fill(false);
  StartVerification = false;
  inVerification = false;
  DoneVerification = false;
  currentDiv: number;
  currentUsername: string;

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<AddGroupBillComponent>) {
   }

  ngOnInit() {
    // console.log(this.valid);
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

  AddBillGroup(f: NgForm) {
    // console.log('GROUP : ', f, this.valid);
    this.CreateGroup(f.value.name, f.value.des, this.ConvertParticipantsToArray(f)).subscribe( data => {
      console.log('GROUP CREATED');
      this.dialogRef.close();
    }, err => {
      console.log('GROUP CREATION FAILED');
      this.dialogRef.close();
    }
    );
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
    console.log('PARTICIPANTS: ', participantsOfTheGroup);
    return participantsOfTheGroup;
  }

  Verify(divId: number, name: string) {
    this.currentDiv = divId;
    this.currentUsername = name;
    const index = this.DivIdtoIndex(divId);
    this.VerifyUser(name).subscribe(data => {
      this.StartVerification = true;
      this.valid[this.currentDiv] = data.available && (this.currentUsername !== this.username);
      this.StartVerification = false;
    });
  }

  VerifyUser(user: string) {
    const endpoint = 'http://127.0.0.1:5000/checkUser';
    const QueryPayload = {username : user, password: 'NOTHING'};
    return this.http.post<Validity>(endpoint, QueryPayload);
  }

  CreateGroup( Groupname: string, description: string, participants: string[]) {
    const endpoint = 'http://127.0.0.1:5000/createGroup';
    // tslint:disable-next-line:max-line-length
    const QueryPayload = {group_title : Groupname, group_description: description, users: participants, user_name: this.username};
    return this.http.post(endpoint, QueryPayload);
  }

}
