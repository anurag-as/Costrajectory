import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeBillComponent } from '../../../view-table-bill/change-bill/change-bill.component';
import { ViewBillComponent } from '../../../view-table-bill/view-bill/view-bill.component';
import { DeleteBillComponent } from '../../../view-table-bill/delete-bill/delete-bill.component';
import { EditBillComponent } from '../../../view-table-bill/edit-bill/edit-bill.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GlobalConfigsService } from '../../../global-configs.service';

@Component({
  selector: 'app-mini-bill-interface',
  templateUrl: './mini-bill-interface.component.html',
  styleUrls: ['./mini-bill-interface.component.css']
})
export class MiniBillInterfaceComponent implements OnInit {

  @Input() BillName: string = undefined;
  @Input() BillDescription = '';
  @Input() BillAmount: string = undefined;
  @Input() BillEnum: any = undefined;
  @Input() BillHasImage: boolean = undefined;
  @Input() BillIdentifier: string = undefined; // mapped filename
  @Input() BillImage: any = undefined; // actual filename
  @Input() BillDate: any = undefined;
  @Input() BillId: any = undefined;
  @Input() BillCategory: any = undefined;
  ViewImage = false;

  constructor(public dialog: MatDialog, private Globals: GlobalConfigsService, private http: HttpClient) { }

  ngOnInit() {
    // console.log('Transaction component: ', this.BillId, this.BillIdentifier);
  }

  ChangeBill(): void {
    const dialogRef = this.dialog.open(ChangeBillComponent, {
      width: '1300px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUsername();
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.BillDescription = this.BillDescription;
    dialogRef.componentInstance.BillAmount = this.BillAmount;
    dialogRef.componentInstance.BillDate = this.ChangeBillFormat(this.BillDate);
    dialogRef.componentInstance.MappedImageName = this.BillIdentifier;
    dialogRef.componentInstance.ActualImageName = this.BillImage;
    dialogRef.componentInstance.BillHasImage = this.BillHasImage;
    dialogRef.componentInstance.BillCategory = this.BillCategory;

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  EditBill(): void {
    const dialogRef = this.dialog.open(EditBillComponent, {
      width: '1300px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUsername();
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.BillDescription = this.BillDescription;
    dialogRef.componentInstance.BillAmount = this.BillAmount;
    dialogRef.componentInstance.BillDate = this.ChangeBillFormat(this.BillDate);
    dialogRef.componentInstance.MappedImageName = this.BillIdentifier;
    dialogRef.componentInstance.ActualImageName = this.BillImage;
    dialogRef.componentInstance.BillHasImage = this.BillHasImage;
    dialogRef.componentInstance.BillID = this.BillId;
    dialogRef.componentInstance.BillCategory = this.BillCategory;
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  ViewBill(): void {
    const dialogRef = this.dialog.open(ViewBillComponent, {
      width: '800px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUsername();
    /*
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.BillDescription = this.BillDescription;
    dialogRef.componentInstance.BillAmount = this.BillAmount;
    dialogRef.componentInstance.BillDate = this.ChangeBillFormat(this.BillDate);*/
    dialogRef.componentInstance.MappedImageName = this.BillIdentifier;
    dialogRef.componentInstance.ActualImageName = this.BillImage;

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  DeleteBill(): void {
    const dialogRef = this.dialog.open(DeleteBillComponent, {
      width: '300px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUsername();
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.BillDescription = this.BillDescription;
    dialogRef.componentInstance.BillAmount = this.BillAmount;
    dialogRef.componentInstance.BillDate = this.ChangeBillFormat(this.BillDate);
    dialogRef.componentInstance.MappedImageName = this.BillIdentifier;
    dialogRef.componentInstance.ActualImageName = this.BillImage;
    dialogRef.componentInstance.BillID = this.BillId;

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openImage() {
    this.ViewImage = true;
  }

  closeImage() {
    this.ViewImage = false;
  }

  DeleteBillFromThisComponent(): void {
    const endpoint = 'http://127.0.0.1:5000/transactions/deleteTransaction';
    const QueryPayload = {uid: this.BillId, username: this.Globals.GetUsername(), mapped_name: this.BillIdentifier};
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: QueryPayload
    };

    // console.log('Deleting the entry :', QueryPayload);
    this.http.delete(endpoint, options).subscribe(data => {
      window.location.reload();
    });
  }

  ChangeBillFormat(date) {
    // console.log('inp date: ', date);
    // const splitDate = date.split( '/' );
    // const outDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
    return date;
  }

}
