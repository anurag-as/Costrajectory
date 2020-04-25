import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { GroupBillPostUtilitiesService } from '../group-bill-post-utilities.service';

@Component({
  selector: 'app-copy-bill',
  templateUrl: './copy-bill.component.html',
  styleUrls: ['./copy-bill.component.css']
})
export class CopyBillComponent implements OnInit {
  @Input() BillId: number;
  @Input() Amount: string;
  @Input() category: string;
  @Input() dateTime: string;
  @Input() Discription: string;
  @Input() GroupId: string;
  @Input() payer: string;
  @Input() share: string[];
  @Input() uploader: string;
  @Input() Username: string;
  @Input() ImageName: string;
  @Input() BillName: string;
  @Input() Participants: string[];
  @Input() ShareCopy: string[];
  @Input() AmountCopy: string;
  ValueMapper: number[] = [];
  IsShowingSharing = true;


  imageToShow = undefined;
  canShowImage = true;
  base64Data = undefined;
  uploading = 'not started';
  imgfromServer = true;
  fileToUpload = undefined;
  canShowImageUploaded = false;
  imageUploaded = false;
  imageSrc;
  BillHasImage: boolean = undefined;


  constructor(private PosterService: GroupBillPostUtilitiesService) { }

  ngOnInit() {
    this.fileToUpload = this.ImageName;
    console.log('IMAGE NAME: ',this.ImageName);
    if (this.ImageName !== 'False') {
      this.getImage();
    }
    // tslint:disable-next-line:prefer-const
    let valueJSON: any = {};
    valueJSON =  this.MakeJson();
    this.MakeValueArray(valueJSON);
  }

  ChangeMode() {
    this.IsShowingSharing = ! this.IsShowingSharing;
  }

  private MakeValueArray(valueJSON) {
    for (const participant of this.Participants) {
      this.ValueMapper.push( valueJSON[participant] );
    }
  }

  private MakeJson() {
    // tslint:disable-next-line:prefer-const
    let valueJSON: any = {};
    for (const participant of this.Participants) {
      valueJSON[participant] = 0;
    }
    for (const shareList of this.share) {
      valueJSON[shareList[0]] = shareList[1];
    }
    return valueJSON;
  }

  ChangeArrayValue({NewValue, Index}) {
    this.ValueMapper[Index] =  NewValue;
    this.Amount = String(this.ValueMapper.reduce((a, b) => a + b));
    // console.log('NEW VALUES: ', this.ValueMapper, this.Amount);
  }

  ResetValues() {
    this.ValueMapper = [];
    this.Amount = this.AmountCopy;
    let valueJSON: any = {};
    valueJSON =  this.MakeJson();
    this.MakeValueArray(valueJSON);
  }

  ResetValuesInput(NewValue) {
    this.Amount = NewValue;
    this.ValueMapper = [];
    for (const par of this.Participants) {
      this.ValueMapper.push( parseInt(this.Amount, 10) / this.Participants.length);
    }
  }

  getImage() {
    this.PosterService.receiveImage(this.ImageName, this.BillName).subscribe(data => {
      this.canShowImageUploaded = true;
      this.imageSrc = data.Image;
    });
  }

  clearImage() {
    this.fileToUpload = null;
    this.BillHasImage = false;
    this.imageUploaded = false;
  }

  private handleFileInput(files: FileList) {
    // console.log(this.fileToUpload);
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.fileToUpload);
    this.imageUploaded = true;
}

}
