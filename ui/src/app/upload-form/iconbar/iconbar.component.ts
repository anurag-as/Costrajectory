import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddBillsComponent } from '../add-bills/add-bills.component';
import { Input } from '@angular/core';
import {Router} from '@angular/router';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-iconbar',
  templateUrl: './iconbar.component.html',
  styleUrls: ['./iconbar.component.css']
})
export class IconbarComponent implements OnInit {
  @Input() userName;
  usageQuota = undefined;
  color: ThemePalette = 'warn';
  constructor(public dialog: MatDialog, private route: Router) {}

  ngOnInit() {
    this.usageQuota = 10;
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

  analytics(): void {
    this.route.navigate(['/analytics']);
  }

  GoHome(): void {
    this.route.navigate(['']);
  }

}

