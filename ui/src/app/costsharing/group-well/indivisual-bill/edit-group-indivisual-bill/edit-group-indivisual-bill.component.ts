import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { GroupBillPostUtilitiesService } from '../group-bill-post-utilities.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BillPostUtilityService } from '../../../add-shared-bill/bill-post-utility.service';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-group-indivisual-bill',
  templateUrl: './edit-group-indivisual-bill.component.html',
  styleUrls: ['./edit-group-indivisual-bill.component.css']
})
export class EditGroupIndivisualBillComponent implements OnInit {
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
  constructor(private PosterService: GroupBillPostUtilitiesService, private dialogRef: MatDialogRef<EditGroupIndivisualBillComponent>, private BillPostUtility: BillPostUtilityService) { }

  ngOnInit() {
    if (this.ImageName !== 'False') {
      this.BillHasImage = true;
      this.getImage();
    }
    // tslint:disable-next-line:prefer-const
    let valueJSON: any = {};
    valueJSON =  this.MakeJson();
    this.MakeValueArray(valueJSON);
  }

  ChangeMode() {
    this.IsShowingSharing = ! this.IsShowingSharing;
  }

  private MakeValueArray(valueJSON) {
    for (const participant of this.Participants) {
      this.ValueMapper.push( valueJSON[participant] );
    }
  }

  private MakeJson() {
    // tslint:disable-next-line:prefer-const
    let valueJSON: any = {};
    for (const participant of this.Participants) {
      valueJSON[participant] = 0;
    }
    for (const shareList of this.share) {
      valueJSON[shareList[0]] = shareList[1];
    }
    return valueJSON;
  }

  ChangeArrayValue({NewValue, Index}) {
    this.ValueMapper[Index] =  NewValue;
    this.Amount = String(this.ValueMapper.reduce((a, b) => a + b));
    // console.log('NEW VALUES: ', this.ValueMapper, this.Amount);
  }

  ResetValues() {
    this.ValueMapper = [];
    this.Amount = this.AmountCopy;
    let valueJSON: any = {};
    valueJSON =  this.MakeJson();
    this.MakeValueArray(valueJSON);
  }

  ResetValuesInput(NewValue) {
    this.Amount = NewValue;
    this.ValueMapper = [];
    for (const par of this.Participants) {
      this.ValueMapper.push( parseInt(this.Amount, 10) / this.Participants.length);
    }
  }

  getImage() {
    this.PosterService.receiveImage(this.ImageName, this.BillName, this.Username).subscribe(data => {
      this.canShowImageUploaded = true;
      this.imageSrc = data.Image;
      // console.log('IMAGE :', this.imageSrc);
    });
  }

  clearImage() {
    this.fileToUpload = null;
    this.BillHasImage = false;
    this.imageUploaded = false;
    this.ImageName = 'False';
  }

  handleFileInput(files: FileList) {
    // console.log(this.fileToUpload);
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.fileToUpload);
    this.imageUploaded = true;
}

  closeDialog() {
    this.dialogRef.close();
  }

  dataURLtoFile(arr, filename) {
    const bstr = atob(arr);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename);
  }


  uploadFileToActivity(f: NgForm) {
    // console.log('CHECKS : ', this.BillHasImage, this.imageUploaded);
    this.dialogRef.disableClose = true;
    if (this.BillHasImage && !this.imageUploaded) {
      this.fileToUpload = this.dataURLtoFile(this.imageSrc, this.ImageName);
      // console.log('CAME');
    }
    this.uploading = 'started';
    // console.log('CAME');
    // tslint:disable-next-line:max-line-length
    this.BillPostUtility.UploadBillToServer_edit(f, this.Username, this.fileToUpload,  parseInt(this.GroupId, 10) , this.Participants, this.ValueMapper, this.BillId).subscribe(data => {
     // this.TableAdder.AppendEntry(this.CurrentForm);
     this.dialogRef.disableClose = false;
     if (data.message === 'User Quota Exceeded') {
      window.alert('USER QUOTA EXCEEDED, ADDING ONLY BILL');
      this.dialogRef.close();
     }
     this.uploading = 'ended success';
     this.dialogRef.close();
     // window.alert('FILE UPLOADED SUCCESSFULLY');
     }, error => {
       this.uploading = 'ended fail';
       window.alert('PROBLEM WTH UPLOAD TRY AGAIN LATER');
       this.dialogRef.close();
     });
    }

}

