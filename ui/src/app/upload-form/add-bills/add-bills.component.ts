import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import {NgForm} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { TabularViewComponent } from '../tabular-view/tabular-view.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.css'],
  providers: [TabularViewComponent]
})
export class AddBillsComponent implements OnInit {
  fileToUpload: File = null;
  username = undefined;
  currentDate;
  datetoday = new Date();
  imageSrc;
  CurrentForm;
  uploading = 'not started';

  constructor(private uploader: UploadService, private router: Router, private TableAdder: TabularViewComponent) {}

  ngOnInit() {
   // console.log();
  }

  private handleFileInput(files: FileList) {
    // console.log(this.fileToUpload);
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.fileToUpload);

}

 set uploadStatus(status: string) {
  this.uploading = status;
  // console.log('SETTER', this.uploading, status);
 }

 get uploadStatus() {
   // console.log('SETTER', this.uploading);
   return this.uploading;
 }

 set SetForm(form: NgForm) {
   this.CurrentForm = form;
   // console.log('SETTER FORM', this.CurrentForm);
 }

 get GetForm() {
  // console.log('GETTER FORM', this.CurrentForm);
   return this.CurrentForm;
 }

  uploadFileToActivity(f: NgForm) {
   this.uploading = 'started';
   this.uploader.postFile(this.fileToUpload, f, this.username).subscribe(data => {
    // this.TableAdder.AppendEntry(this.CurrentForm);
    if (data.message === 'User Quota Exceeded') {
      window.alert('USER QUOTA EXCEEDED, ADDING ONLY BILL');
     }
    this.uploading = 'ended success';
    window.location.reload();
    // window.alert('FILE UPLOADED SUCCESSFULLY');
    }, error => {
      this.uploading = 'ended fail';
      // window.alert('PROBLEM WTH UPLOAD TRY AGAIN LATER');
    });

}


}
