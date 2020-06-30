import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalConfigsService } from '../../global-configs.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-bill',
  templateUrl: './delete-bill.component.html',
  styleUrls: ['./delete-bill.component.css']
})
export class DeleteBillComponent implements OnInit {

  username = undefined;
  BillName = '';
  BillDescription = '';
  BillAmount: string = undefined;
  BillEnum: any = undefined;
  BillHasImage: boolean = undefined;
  BillIdentifier: string = undefined;
  BillImage: any = undefined;
  BillDate: any = undefined;
  MappedImageName = undefined;
  ActualImageName = undefined;
  imageToShow = undefined;
  canShowImage = false;
  base64Data = undefined;
  BillID: any = undefined;
  DataChanged = false;
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private Globals: GlobalConfigsService,
              private dialogRef: MatDialogRef<DeleteBillComponent>) { }

  ngOnInit() {
    // console.log('Transaction component delete: ', this.BillID, this.MappedImageName);
    const r = confirm('Are you sure you want to delete the Bill? ');
    if (r === true) {
      this.DeleteBillFromThisComponent();
      // window.location.reload();
      } else {
      this.dialogRef.close({dataChanged : this.DataChanged});
    }
  }

  DeleteBillFromThisComponent(): void {
    const endpoint = 'http://127.0.0.1:5000/transactions/deleteTransaction';
    const QueryPayload = {uid: this.BillID, username: this.Globals.GetUsername(), mapped_name: this.MappedImageName};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: QueryPayload
    };

    // console.log('Deleting the entry :', QueryPayload);
    this.http.delete(endpoint, options).subscribe(data => {
      this.DataChanged = true;
      this.dialogRef.close({dataChanged : this.DataChanged});
    }, err => {
      this.dialogRef.close({dataChanged : this.DataChanged});
    });
  }

}
