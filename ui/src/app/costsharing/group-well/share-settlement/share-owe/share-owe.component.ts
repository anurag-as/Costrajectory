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
  @Input() AliasData;

  currentValue: number;
  constructor(private BIllUitlity: BillPostUtilityService, private http: HttpClient) { }

  ngOnInit() {
    this.currentValue = this.SettlementValue;
    // console.log('INSIDE OWE: ', this.SettlementValue, this.Payer, this.AliasData );
  }

  ResetValue() {
    this.currentValue = this.SettlementValue;
  }

  PostValue() {
    this.ChangeEvent.emit({payer: this.Payer, value: this.currentValue});
  }

}
