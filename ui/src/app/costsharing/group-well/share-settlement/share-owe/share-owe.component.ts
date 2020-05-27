import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { BillPostUtilityService } from '../../../add-shared-bill/bill-post-utility.service';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-share-owe',
  templateUrl: './share-owe.component.html',
  styleUrls: ['./share-owe.component.css']
})
export class ShareOweComponent implements OnInit {
  @Input() SettlementValue: number;
  @Input() Payer: string;
  @Output() ChangeEvent = new EventEmitter<{payer: string, value: number}>();

  currentValue: number;
  constructor(private BIllUitlity: BillPostUtilityService, private http: HttpClient) { }

  ngOnInit() {
    this.currentValue = this.SettlementValue;
  }

  ResetValue() {
    this.currentValue = this.SettlementValue;
  }

  PostValue(payerIn: string, valueIn: number) {
    console.log('CURRENT VALUE: ', this.currentValue);
    this.ChangeEvent.emit({payer: payerIn, value: valueIn});
  }

}
