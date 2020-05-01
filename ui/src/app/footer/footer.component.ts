import { Component, OnInit } from '@angular/core';
import { BugreportComponent } from './bugreport/bugreport.component';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  goToLink(url: string) {
    window.open(url, '_blank');
}

RaiseBugReport(): void {
  const dialogRef = this.dialog.open(BugreportComponent, {
    panelClass: 'myapp-no-padding-dialog',
    width: '1000px'
    });
}

}
