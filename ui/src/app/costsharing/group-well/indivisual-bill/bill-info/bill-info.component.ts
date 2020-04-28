import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';

export interface SharedTable {
  Member: string;
  Share: string;
}

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.css']
})
export class BillInfoComponent implements OnInit {
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
  @Input() Admin: string;
  TabledShareData: SharedTable[] = [];
  Columns = ['Member', 'Share'];
  constructor() { }

  ngOnInit() {
    this.MakeTableSharedData();
    console.log(this.TabledShareData);
  }

  MakeTableSharedData() {
    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0 ; i < this.share.length ; i++) {
      this.TabledShareData.push({Member: this.share[i][0], Share: this.share[i][1]});
    }
  }

}
