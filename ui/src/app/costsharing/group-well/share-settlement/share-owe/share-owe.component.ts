import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-share-owe',
  templateUrl: './share-owe.component.html',
  styleUrls: ['./share-owe.component.css']
})
export class ShareOweComponent implements OnInit {
  @Input() SettlementValue: number;
  currentValue: number;
  constructor() { }

  ngOnInit() {
    this.currentValue = this.SettlementValue;
  }

  ResetValue() {
    this.currentValue = this.SettlementValue;
  }

  PostValue() {
    console.log('CURRENT VALUE: ', this.currentValue);
  }

}
