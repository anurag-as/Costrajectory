import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-mini-owe-interface',
  templateUrl: './mini-owe-interface.component.html',
  styleUrls: ['./mini-owe-interface.component.css']
})
export class MiniOweInterfaceComponent implements OnInit {
  @Input() SettlementValue: number;
  @Input() Payer: string;
  @Output() ChangeEvent = new EventEmitter<{payer: string, value: number, GroupId: number}>();
  @Input() AliasData;
  @Input() GroupName = undefined;
  @Input() GroupId: number;
  GroupNameTruncated: string;

  currentValue: number;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.currentValue = this.SettlementValue;
    // console.log('INSIDE OWE: ', this.SettlementValue, this.Payer, this.AliasData );
    if ( this.GroupName !== undefined && this.GroupName.length >= 10) {
      this.GroupNameTruncated = this.GroupName.substring (0, 8);
      this.GroupNameTruncated = this.GroupNameTruncated + '...' ;
    } else {
      this.GroupNameTruncated = this.GroupName;
    }
  }

  ResetValue() {
    this.currentValue = this.SettlementValue;
  }

  PostValue() {
    this.ChangeEvent.emit({payer: this.Payer, value: this.currentValue, GroupId: this.GroupId});
  }

}
