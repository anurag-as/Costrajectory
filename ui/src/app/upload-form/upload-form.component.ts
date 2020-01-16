import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  fileToUpload: File = null;
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
