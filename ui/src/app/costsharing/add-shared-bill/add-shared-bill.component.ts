import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { GlobalConfigsService } from '../../global-configs.service';
import {HttpClient} from '@angular/common/http';
import { BillPostUtilityService } from './bill-post-utility.service';
import { EventEmitter } from '@angular/core';

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
  @Output() RefreshData = new EventEmitter();
  Value = undefined;
  ValueMapper = Array();
  IsShowingSharing = true;
  loading = false;
  datetoday = new Date();
  imageSrc;
  CurrentForm;
  uploading = 'not started';
  fileToUpload: File = null;
  currentDate;

  constructor(private http: HttpClient, private BIllUitlity: BillPostUtilityService) { }

  ngOnInit() {
    // this.Participants = ['rohitp2512@gmail.com', 'b', 'c', 'd'];
    for (const par of this.Participants) {
      this.ValueMapper.push(this.Value / this.Participants.length);
    }
  }

  ChangeMode() {
    this.IsShowingSharing = ! this.IsShowingSharing;
  }

  private handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    // console.log(this.fileToUpload);
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.fileToUpload);
}


  ResetValues(NewValue) {
    this.Value = NewValue;
    this.ValueMapper = Array();
    for (const par of this.Participants) {
      this.ValueMapper.push(this.Value / this.Participants.length);
    }
    // console.log('RESET VALUES: ', this.ValueMapper);
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
    // console.log('NEW VALUES: ', this.ValueMapper, this.Value);
  }

  UploadBill(f: NgForm) {
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.BIllUitlity.UploadBillToServer(f, this.Username, this.fileToUpload, this.BillId, this.Participants, this.ValueMapper).subscribe( data => {
      // console.log(data);
      this.loading = false;
      this.RefreshData.emit();
    });
  }

}
