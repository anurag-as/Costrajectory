import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddBillsComponent } from '../add-bills/add-bills.component';
import { Input } from '@angular/core';

@Component({
  selector: 'app-iconbar',
  templateUrl: './iconbar.component.html',
  styleUrls: ['./iconbar.component.css']
})
export class IconbarComponent implements OnInit {
  @Input() userName;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  addBill(): void {
    const dialogRef = this.dialog.open(AddBillsComponent, {
      width: '1300px'
    });
    dialogRef.componentInstance.username = this.userName;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

