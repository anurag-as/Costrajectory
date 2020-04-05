import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GlobalConfigsService } from '../global-configs.service';
import { AddGroupBillComponent } from './add-group-bill/add-group-bill.component';
import { AddGroupContainerComponent } from './add-group-container/add-group-container.component';

@Component({
  selector: 'app-costsharing',
  templateUrl: './costsharing.component.html',
  styleUrls: ['./costsharing.component.css']
})
export class CostsharingComponent implements OnInit {
  
  constructor(public dialog: MatDialog, private Globals: GlobalConfigsService) { }

  ngOnInit() {
  }

  addGroupBill(): void {
    const dialogRef = this.dialog.open(AddGroupBillComponent, {
      width: '800px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUserName;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addGroupContainer(): void {
    const dialogRef = this.dialog.open(AddGroupContainerComponent, {
      width: '1300px'
    });
    dialogRef.componentInstance.username = this.Globals.GetUserName;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
