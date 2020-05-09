import { Component, OnInit } from '@angular/core';
import { BugreportComponent } from './bugreport/bugreport.component';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  OnMouseHover = false;
  constructor(public dialog: MatDialog, private route: Router) { }

  ngOnInit() {
  }

  goToLink(url: string) {
    window.open(url, '_blank');
}

RedirectTolink(url: string) {
  this.route.navigate(['/' + url]);
}

RaiseBugReport(): void {
  const dialogRef = this.dialog.open(BugreportComponent, {
    panelClass: 'myapp-no-padding-dialog',
    width: '1000px'
    });
}

over() {
  this.OnMouseHover = true;
}

out() {
  this.OnMouseHover = false;
}

}
