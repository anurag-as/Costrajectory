import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupBillPostUtilitiesService } from '../group-bill-post-utilities.service';

export interface SharedTable {
  Member: string;
  Share: string;
}

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.css']
})
export class BillInfoComponent implements OnInit {
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
  @Input() ShareCopy: string[];
  @Input() AmountCopy: string;
  @Input() Admin: string;
  TabledShareData: SharedTable[] = [];
  Columns = ['Member', 'Share'];
  IsShowingSharing = true;
  canShowImageUploaded = false;
  imageSrc;

  constructor(private dialogRef: MatDialogRef<BillInfoComponent>, private PosterService: GroupBillPostUtilitiesService) { }

  ngOnInit() {
    this.MakeTableSharedData();
    if (this.ImageName !== 'False') {
      this.getImage();
    }
  }

  MakeTableSharedData() {
    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0 ; i < this.share.length ; i++) {
      this.TabledShareData.push({Member: this.share[i][0], Share: this.share[i][1]});
    }
  }

  CloseDialog() {
    this.dialogRef.close();
  }

  ChangeMode() {
    if (this.ImageName !== 'False') {
      this.IsShowingSharing = ! this.IsShowingSharing;
    }
  }

  DownloadBill() {}

  getImage() {
    this.PosterService.receiveImage(this.ImageName, this.BillName, this.Username).subscribe(data => {
      this.canShowImageUploaded = true;
      this.imageSrc = data.Image;
      // console.log('IMAGE :', this.imageSrc);
    });
  }

}
