import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.css']
})
export class AddBillsComponent implements OnInit {
  fileToUpload: File = null;
  username = undefined;
  constructor(private uploader: UploadService) { }

  ngOnInit() {
  }

  private handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    // console.log(this.fileToUpload);
}

 private uploadFileToActivity(f: NgForm) {
  this.uploader.postFile(this.fileToUpload, f, this.username).subscribe(data => {
    window.alert('FILE UPLOADED SUCCESSFULLY');
    }, error => {
      window.alert('PROBLEM WTH UPLOAD TRY AGAIN LATER');
    });
}


}
