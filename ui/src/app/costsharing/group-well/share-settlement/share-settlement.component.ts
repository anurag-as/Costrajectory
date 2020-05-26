import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-settlement',
  templateUrl: './share-settlement.component.html',
  styleUrls: ['./share-settlement.component.css']
})
export class ShareSettlementComponent implements OnInit {
  @Input() UserAlias: any;
  @Input() SharingData: any[];
  constructor(private dialogRef: MatDialogRef<ShareSettlementComponent>) { }

  ngOnInit() {
    console.log('SHARED DATA:', this.UserAlias, this.SharingData);
  }

  Close() {
    this.dialogRef.close();
  }

}
