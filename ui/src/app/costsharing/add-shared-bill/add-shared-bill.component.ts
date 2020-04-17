import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { GlobalConfigsService } from '../../global-configs.service';
import {HttpClient} from '@angular/common/http';

interface ReturnImage {
  Image: any;
}

@Component({
  selector: 'app-add-shared-bill',
  templateUrl: './add-shared-bill.component.html',
  styleUrls: ['./add-shared-bill.component.css']
})
export class AddSharedBillComponent implements OnInit {
  @Input() Username;
  @Input() BillId;
  @Input() Participants;
  Value = 100;
  ValueMapper = Array();
  IsShowingSharing = true;

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.Participants = ['rohitp2512@gmail.com', 'b', 'c', 'd'];
    for (const par of this.Participants) {
      this.ValueMapper.push(this.Value / this.Participants.length);
    }
  }

  receiveImage(URL: string, Payload: any) {
    return this.http.post<ReturnImage>(URL, Payload);
  }

  ChangeMode() {
    this.IsShowingSharing = ! this.IsShowingSharing;
  }

  getImage() {
    const endpoint = 'http://127.0.0.1:5000/previewImage';
    const QueryPayload = {username: this.username, mapped_name : this.MappedImageName, original_name: this.ActualImageName};
    this.receiveImage(endpoint, QueryPayload).subscribe(data => {
      this.canShowImageUploaded = true;
      this.imageSrc = data.Image;
    });
  }


  private handleFileInput(files: FileList) {
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


  ResetValues(NewValue) {
    this.Value = NewValue;
    this.ValueMapper = Array();
    for (const par of this.Participants) {
      this.ValueMapper.push(this.Value / this.Participants.length);
    }
    console.log('RESET VALUES: ', this.ValueMapper);
  }

  CalculateValue() {
    this.Value = this.ValueMapper.reduce((a, b) => a + b);
  }

  Decrement(index: number) {
    this.ValueMapper[index] = Math.max(0 , this.ValueMapper[index] - 1 );
  }

  Increment(index: number) {
    this.ValueMapper[index] = this.ValueMapper[index] + 1;
  }

  ChangeArrayValue({NewValue, Index}) {
    this.ValueMapper[Index] =  NewValue;
    this.Value = this.ValueMapper.reduce((a, b) => a + b);
    console.log('NEW VALUES: ', this.ValueMapper, this.Value);
  }

}
