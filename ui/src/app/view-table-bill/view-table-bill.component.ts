import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeBillComponent } from './change-bill/change-bill.component';
import { GlobalConfigsService } from '../global-configs.service';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { DeleteBillComponent } from './delete-bill/delete-bill.component';
import { EditBillComponent } from './edit-bill/edit-bill.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BillPhotoComponent } from './bill-photo/bill-photo.component';

@Component({
  selector: 'app-view-table-bill',
  templateUrl: './view-table-bill.component.html',
  styleUrls: ['./view-table-bill.component.css']
})
export class ViewTableBillComponent implements OnInit {
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
  @Output() refreshCopy = new EventEmitter();

  ViewImage = false;

  constructor(public dialog: MatDialog, private Globals: GlobalConfigsService, private http: HttpClient) { }

  ngOnInit() {
    // console.log('Transaction component: ', this.BillId, this.BillIdentifier);
  }

  refreshcopy() {
    this.refreshCopy.emit();
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
      if ( result === undefined ) {
        return;
      }
      if ( result.dataChanged ) {
        this.refreshCopy.emit();
      }
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
      if ( result === undefined ) {
        return;
      }
      if ( result.dataChanged ) {
        this.refreshCopy.emit();
      }
    });
  }

  ViewBill(): void {
    const dialogRef = this.dialog.open(ViewBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '800px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUsername();
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.Discription = this.BillDescription;
    dialogRef.componentInstance.Amount = this.BillAmount;
    dialogRef.componentInstance.dateTime = this.ChangeBillFormat(this.BillDate);
    dialogRef.componentInstance.MappedImageName = this.BillIdentifier;
    dialogRef.componentInstance.ActualImageName = this.BillImage;
    dialogRef.componentInstance.BillId = this.BillId;
    dialogRef.componentInstance.category = this.BillCategory;
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  ViewBillPhoto(): void {
    const dialogRef = this.dialog.open(BillPhotoComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '800px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUsername();
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.Discription = this.BillDescription;
    dialogRef.componentInstance.Amount = this.BillAmount;
    dialogRef.componentInstance.dateTime = this.ChangeBillFormat(this.BillDate);
    dialogRef.componentInstance.MappedImageName = this.BillIdentifier;
    dialogRef.componentInstance.ActualImageName = this.BillImage;
    dialogRef.componentInstance.BillId = this.BillId;
    dialogRef.componentInstance.category = this.BillCategory;
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
      if ( result === undefined ) {
        return;
      }
      if ( result.dataChanged ) {
        this.refreshCopy.emit();
      }
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
