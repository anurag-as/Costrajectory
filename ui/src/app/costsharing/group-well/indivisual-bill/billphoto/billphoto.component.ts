import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { GroupBillPostUtilitiesService } from '../group-bill-post-utilities.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BillPostUtilityService } from '../../../add-shared-bill/bill-post-utility.service';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-billphoto',
  templateUrl: './billphoto.component.html',
  styleUrls: ['./billphoto.component.css']
})
export class BillphotoComponent implements OnInit {
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
  ValueMapper: number[] = [];
  IsShowingSharing = true;
  LoadingImage = false;


  imageToShow = undefined;
  canShowImage = true;
  base64Data = undefined;
  uploading = 'not started';
  imgfromServer = true;
  fileToUpload = undefined;
  canShowImageUploaded = false;
  imageUploaded = false;
  imageSrc;
  BillHasImage = false;

  // tslint:disable-next-line:max-line-length
  constructor(private PosterService: GroupBillPostUtilitiesService, private dialogRef: MatDialogRef<BillphotoComponent>, private BillPostUtility: BillPostUtilityService) { }

  ngOnInit() {
    console.log('IMAGE :', this.ImageName);
    this.canShowImageUploaded = false;
    this.getImage();
  }

  getImage() {
    this.PosterService.receiveImage(this.ImageName, this.BillName, this.Username).subscribe(data => {
      this.canShowImageUploaded = true;
      this.imageSrc = data.Image;
      // console.log('IMAGE :', this.imageSrc);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
