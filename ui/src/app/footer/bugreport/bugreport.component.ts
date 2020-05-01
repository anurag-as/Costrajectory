import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.component.html',
  styleUrls: ['./bugreport.component.css']
})
export class BugreportComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BugreportComponent>) { }

  ngOnInit() {
  }

  CloseDiaglog() {
    this.dialogRef.close();
  }

}
