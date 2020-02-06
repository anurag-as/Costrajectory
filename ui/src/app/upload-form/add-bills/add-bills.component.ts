import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import {NgForm} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.css'],
})
export class AddBillsComponent implements OnInit {
  fileToUpload: File = null;
  username = undefined;
  currentDate;
  datetoday = new Date();
  imageSrc;
  uploading = 'not started';

  constructor(private uploader: UploadService, private router: Router) {}

  ngOnInit() {
   console.log();
  }

  private handleFileInput(files: FileList) {
    console.log(this.fileToUpload);
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.fileToUpload);

}

 private uploadFileToActivity(f: NgForm) {
   this.uploading = 'started';
   this.uploader.postFile(this.fileToUpload, f, this.username).subscribe(data => {
    this.uploading = 'ended success';
    // window.alert('FILE UPLOADED SUCCESSFULLY');
    }, error => {
      this.uploading = 'ended fail';
      // window.alert('PROBLEM WTH UPLOAD TRY AGAIN LATER');
    });
}


}
