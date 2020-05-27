import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

interface Billdata {
  body: any;
}

interface Status {
  message: string;
  uploadStatus: boolean;
}

@Component({
  selector: 'app-share-settlement',
  templateUrl: './share-settlement.component.html',
  styleUrls: ['./share-settlement.component.css']
})
export class ShareSettlementComponent implements OnInit {
  @Input() UserAlias: any;
  @Input() SharingData: any;
  @Output() ChangeEvent = new EventEmitter();
  @Input() username: string;
  @Input() GroupId: number;
  @Input() GroupIndex: number;

  HasDataChanged = false;
  constructor(private dialogRef: MatDialogRef<ShareSettlementComponent>, private http: HttpClient) {
    dialogRef.backdropClick().subscribe(() => {
      // Close the dialog
      dialogRef.close({DATACHANGED : this.HasDataChanged});
    });
  }

  ngOnInit() {
    // console.log('SHARED DATA:', this.UserAlias, this.SharingData);
  }

  Close() {
    this.dialogRef.close({DATACHANGED : this.HasDataChanged});
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close({DATACHANGED : this.HasDataChanged});
  }


  ReloadPage() {
    const endpoint = 'http://127.0.0.1:5000/group/viewGroup';
    const QueryPayload = {user_name : this.username};
    return this.http.post<Billdata>(endpoint, QueryPayload);
  }

  PostSettlement( postValues: {payer: string, value: number}) {
    this.UploadBillToServer(this.username, this.GroupId, postValues.payer, postValues.value).subscribe( x => {
      console.log('STATUS MESSAGE ', x);
      this.ReloadPage().subscribe(data => {
        console.log('SHARED DATA on refresh:', data.body[this.GroupIndex]);
        this.UserAlias = data.body[this.GroupIndex].user_details;
        this.SharingData = data.body[this.GroupIndex].cost_sharing.settlements;
        this.HasDataChanged = true;
      });
    });
  }

  UploadBillToServer(username: string, GroupID: number, payee: string, amount: number) {
    // console.log('SHARED BILL :', f, username, fileToUpload, GroupID, Participants, SharedValue, f.value.Payee);
    const Endpoint = 'http://127.0.0.1:5000/group/addGroupBill';
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('description', '');
    formData.append('title', 'Settlement Bill');
    formData.append('date', '');
    formData.append('amount', String(amount));
    formData.append('category', 'settlement');
    formData.append('payer', payee);
    formData.append('group_id', String(GroupID));
    formData.append('shares', this.NameToValueMapper([payee, username], [0, amount]));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log('SETTLE PAY :', username, GroupID, amount, payee);

    return this.http.post<Status>(Endpoint, formData, {headers});
  }

  NameToValueMapper(Participants: string[], SharedValue: number[]) {
    // tslint:disable-next-line:prefer-const
    let ConsolidatedListOfJSON = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < Participants.length; i = i + 1) {
      ConsolidatedListOfJSON.push('[' + String([Participants[i], SharedValue[i]]) + ']');
    }
    // console.log('SHARES: ', ConsolidatedListOfJSON, '[' + String(ConsolidatedListOfJSON) + ']');
    return '[' + String(ConsolidatedListOfJSON) + ']';
  }


}
