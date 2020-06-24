import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { GlobalConfigsService } from '../../global-configs.service';
import {HttpClient} from '@angular/common/http';
import { UploadService } from '../../upload-form/upload.service';
import { MatDialogRef } from '@angular/material/dialog';

interface ReturnImage {
  Image: any;
}
@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent implements OnInit {
  username = undefined;
  BillName = '';
  BillDescription = '';
  BillAmount: string = undefined;
  BillEnum: any = undefined;
  BillHasImage: boolean = undefined;
  BillID = undefined;
  BillIdentifier: string = undefined;
  BillImage: any = undefined;
  BillDate: any = undefined;
  BillCategory: any = undefined;
  MappedImageName = undefined;
  ActualImageName = undefined;
  imageToShow = undefined;
  canShowImage = true;
  base64Data = undefined;
  uploading = 'not started';
  fileToUpload =  this.ActualImageName;
  imgfromServer = true;
  canShowImageUploaded = false;
  imageUploaded = false;
  imageSrc;
  DataChanged = false;
  constructor(private http: HttpClient, private uploader: UploadService, private dialogRef: MatDialogRef<EditBillComponent>) { }

  receiveImage(URL: string, Payload: any) {
    return this.http.post<ReturnImage>(URL, Payload);
  }

  getImage() {
    const endpoint = 'http://127.0.0.1:5000/transactions/previewImage';
    const QueryPayload = {username: this.username, mapped_name : this.MappedImageName, original_name: this.ActualImageName};
    this.receiveImage(endpoint, QueryPayload).subscribe(data => {
      this.canShowImageUploaded = true;
      this.imageSrc = data.Image;
    });
  }

  ngOnInit() {
    // console.log('00000000 :', this.BillHasImage);
    this.getImage();
  }

  handleFileInput(files: FileList) {
    // console.log(this.fileToUpload);
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.fileToUpload);
    this.imageUploaded = true;
}


clearImage() {
  this.fileToUpload = null;
  this.BillHasImage = false;
  this.imageUploaded = false;
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
  if (this.fileToUpload == null && this.BillHasImage) {
    this.fileToUpload = this.dataURLtoFile(this.imageSrc, this.ActualImageName);
  }
  this.uploading = 'started';
  // console.log('CAME');
  this.uploader.postEditFile(this.fileToUpload, f, this.username, this.BillID).subscribe(data => {
   // this.TableAdder.AppendEntry(this.CurrentForm);
   if (data.message === 'User Quota Exceeded') {
    window.alert('USER QUOTA EXCEEDED, ADDING ONLY BILL');
   }
   this.uploading = 'ended success';
   // window.location.reload();
   this.DataChanged = true;
   this.dialogRef.close({dataChanged : this.DataChanged});
   // window.alert('FILE UPLOADED SUCCESSFULLY');
   }, error => {
     this.uploading = 'ended fail';
     this.dialogRef.close({dataChanged : this.DataChanged});
     // window.alert('PROBLEM WTH UPLOAD TRY AGAIN LATER');
   });
  }



  SubmitChanges() {}
}
