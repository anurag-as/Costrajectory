import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ChangeBillComponent } from './change-bill/change-bill.component';
import { GlobalConfigsService } from '../global-configs.service';

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
  @Input() BillIdentifier: string = undefined;
  @Input() BillImage: any = undefined;
  @Input() BillDate: any = undefined;

  constructor(public dialog: MatDialog, private Globals: GlobalConfigsService) { }

  ngOnInit() {
  }

  ChangeBill(): void {
    const dialogRef = this.dialog.open(ChangeBillComponent, {
      width: '1300px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUsername;
    dialogRef.componentInstance.BillName = this.BillName;
    dialogRef.componentInstance.BillDescription = this.BillDescription;
    dialogRef.componentInstance.BillAmount = this.BillAmount;
    dialogRef.componentInstance.BillDate = this.ChangeBillFormat(this.BillDate);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ChangeBillFormat(date) {
    const splitDate = date.split( '/' );
    const outDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
    return outDate;
  }

}
