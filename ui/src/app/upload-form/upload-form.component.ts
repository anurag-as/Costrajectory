import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import {NgForm} from '@angular/forms';
import { Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  fileToUpload: File = null;
  @Input() userName;
  constructor(private uploader: UploadService, private route: Router) { }

  ngOnInit() {
    this.route.navigate(['/analytics']);
  }

  private handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
}


}
