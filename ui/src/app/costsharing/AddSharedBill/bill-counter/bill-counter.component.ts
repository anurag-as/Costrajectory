import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bill-counter',
  templateUrl: './bill-counter.component.html',
  styleUrls: ['./bill-counter.component.css']
})
export class BillCounterComponent implements OnInit {
  @Input() ParticipantIndex;
  @Input() ParticipantValue;
  @Output() ChangeValue = new EventEmitter<{NewValue: number, Index: number}>();
  constructor() { }

  ngOnInit() {
  }

  DecrementValue() {
    this.ParticipantValue = Math.max(0 , this.ParticipantValue - 1 );
    this.ChangeValue.emit({NewValue: this.ParticipantValue, Index: this.ParticipantIndex});
  }

  IncrementValue() {
    this.ParticipantValue = this.ParticipantValue + 1;
    this.ChangeValue.emit({NewValue: this.ParticipantValue, Index: this.ParticipantIndex});
  }

  SetValue(value) {
    // this.ParticipantValue = value;
    console.log('CHANGED VALUE FROM COMPONENT: ', parseInt(value, 10), this.ParticipantIndex);
    this.ChangeValue.emit({NewValue: parseInt(value, 10), Index: this.ParticipantIndex});
  }

}
