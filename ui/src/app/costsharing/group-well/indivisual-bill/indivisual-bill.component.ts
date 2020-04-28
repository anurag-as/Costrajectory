import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CopyBillComponent } from './copy-bill/copy-bill.component';
import { DeleteGroupIndivisualBillComponent } from './delete-group-indivisual-bill/delete-group-indivisual-bill.component';
import { EditGroupIndivisualBillComponent } from './edit-group-indivisual-bill/edit-group-indivisual-bill.component';
import { BillInfoComponent } from './bill-info/bill-info.component';
@Component({
  selector: 'app-indivisual-bill',
  templateUrl: './indivisual-bill.component.html',
  styleUrls: ['./indivisual-bill.component.css']
})
export class IndivisualBillComponent implements OnInit {
  @Input() BillId: number;
  @Input() Amount: string;
  @Input() category: string;
  @Input() dateTime: string;
  @Input() Discription: string;
  @Input() GroupId: string;
  @Input() payer: string;
  @Input() share: string[];
  @Input() uploader: string;
  @Input() Username: string;
  @Input() ImageName: string;
  @Input() BillName: string;
  @Input() Participants: string[];
  @Output() refreshCopy = new EventEmitter();
  @Input() Admin: string;
  FormattedStringId: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.FormattedStringId = String(this.BillId);
  }

  refreshcopy() {
    this.refreshCopy.emit();
  }

  CopySharedBill(): void {
    const dialogRef = this.dialog.open(CopyBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '1300px'
    });
    // dialogRef.componentInstance.BillID = this.BillId;
    dialogRef.componentInstance.BillId = this.BillId;
    dialogRef.componentInstance.Amount = this.Amount;
    dialogRef.componentInstance.category = this.category;
    dialogRef.componentInstance.dateTime = this.dateTime;
    dialogRef.componentInstance.Discription = this.Discription;
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.payer = this.payer;
    dialogRef.componentInstance.share = this.share;
    dialogRef.componentInstance.uploader = this.uploader;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.ShareCopy = this.share;
    dialogRef.componentInstance.AmountCopy = this.Amount;
    dialogRef.componentInstance.ImageName = this.ImageName;
    /*
    [BillId]="BillId"
            [Amount]="Amount"
            [category]="category"
            [dateTime]="dateTime"
            [Discription]="Discription"
            [GroupId]="GroupId"
            [payer]="payer"
            [share]="share"
            [uploader]="uploader"
            [Username]="Username"
            [BillName]="BillName"
            [Participants]="Participants"
            [ShareCopy]="share"
            [AmountCopy]="Amount"
            [ImageName]="ImageName"*/

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshCopy.emit();
    });
  }

  DeleteSharedBill(): void {
    const dialogRef = this.dialog.open(DeleteGroupIndivisualBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '500px'
    });
    // dialogRef.componentInstance.BillID = this.BillId;
    dialogRef.componentInstance.BillId = this.BillId;
    dialogRef.componentInstance.Amount = this.Amount;
    dialogRef.componentInstance.category = this.category;
    dialogRef.componentInstance.dateTime = this.dateTime;
    dialogRef.componentInstance.Discription = this.Discription;
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.payer = this.payer;
    dialogRef.componentInstance.share = this.share;
    dialogRef.componentInstance.uploader = this.uploader;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.ShareCopy = this.share;
    dialogRef.componentInstance.ImageName = this.ImageName;
    dialogRef.componentInstance.Admin = this.Admin;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshCopy.emit();
    });
  }

  EditSharedBill(): void {
    const dialogRef = this.dialog.open(EditGroupIndivisualBillComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '1300px'
    });
    // dialogRef.componentInstance.BillID = this.BillId;
    dialogRef.componentInstance.BillId = this.BillId;
    dialogRef.componentInstance.Amount = this.Amount;
    dialogRef.componentInstance.category = this.category;
    dialogRef.componentInstance.dateTime = this.dateTime;
    dialogRef.componentInstance.Discription = this.Discription;
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.payer = this.payer;
    dialogRef.componentInstance.share = this.share;
    dialogRef.componentInstance.uploader = this.uploader;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.ShareCopy = this.share;
    dialogRef.componentInstance.ImageName = this.ImageName;
    dialogRef.componentInstance.Admin = this.Admin;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshCopy.emit();
    });
  }

  ViewSharedBillInfo(): void {
    const dialogRef = this.dialog.open(BillInfoComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '1000px',
      height: '700px'
    });
    // dialogRef.componentInstance.BillID = this.BillId;
    dialogRef.componentInstance.BillId = this.BillId;
    dialogRef.componentInstance.Amount = this.Amount;
    dialogRef.componentInstance.category = this.category;
    dialogRef.componentInstance.dateTime = this.dateTime;
    dialogRef.componentInstance.Discription = this.Discription;
    dialogRef.componentInstance.GroupId = this.GroupId;
    dialogRef.componentInstance.payer = this.payer;
    dialogRef.componentInstance.share = this.share;
    dialogRef.componentInstance.uploader = this.uploader;
    dialogRef.componentInstance.Username = this.Username;
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.Participants = this.Participants;
    dialogRef.componentInstance.ShareCopy = this.share;
    dialogRef.componentInstance.ImageName = this.ImageName;
    dialogRef.componentInstance.Admin = this.Admin;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshCopy.emit();
    });
  }

}
