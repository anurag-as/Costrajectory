import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Input } from '@angular/core';
import { GlobalConfigsService } from '../../global-configs.service';
import { Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface ReturnImage {
  Image: any;
}

@Component({
  selector: 'app-bill-photo',
  templateUrl: './bill-photo.component.html',
  styleUrls: ['./bill-photo.component.css']
})
export class BillPhotoComponent implements OnInit {

  username = this.Globals.GetUsername();
  @Input() MappedImageName = undefined;
  @Input() ActualImageName = undefined;
  imageToShow = undefined;
  canShowImage = false;
  base64Data = undefined;
  IsShowingSharing = true;
  canShowImageUploaded = false;
  @Input() BillId: number;
  @Input() Amount: string;
  @Input() category: string;
  @Input() dateTime: string;
  @Input() Discription: string;
  @Input() payer: string;
  @Input() BillName: string;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer,
              private Globals: GlobalConfigsService,
              private dialogRef: MatDialogRef<BillPhotoComponent>) { }

   receiveImage(URL: string, Payload: any) {
    return this.http.post<ReturnImage>(URL, Payload);
  }

  ngOnInit() {
    const endpoint = 'http://127.0.0.1:5000/transactions/previewImage';
    const QueryPayload = {username: this.username, mapped_name : this.MappedImageName, original_name: this.ActualImageName};
    // console.log(QueryPayload);
    this.receiveImage(endpoint, QueryPayload).subscribe(data => {
      this.canShowImage = true;
      this.base64Data = data.Image;
    });
  }

  CloseDialog() {
    this.dialogRef.close();
  }

}
