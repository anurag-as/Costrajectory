import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import {NgForm} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  fileToUpload: File = null;
  public uploader2: FileUploader = new FileUploader({url: 'http://127.0.0.1:8000/test', itemAlias: 'photo'});
  constructor(private uploader: UploadService) { }

  ngOnInit() {
  }

  private handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
}


 private uploadFileToActivity(f: NgForm) {
  this.uploader.postFile(this.fileToUpload, f).subscribe(data => {
    window.alert('FILE UPLOADED SUCCESSFULLY');
    }, error => {
      window.alert('PROBLEM WTH UPLOAD TRY AGAIN LATER');
    });
}





}
