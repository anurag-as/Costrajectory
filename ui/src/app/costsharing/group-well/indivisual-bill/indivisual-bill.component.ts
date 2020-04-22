import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'app-indivisual-bill',
  templateUrl: './indivisual-bill.component.html',
  styleUrls: ['./indivisual-bill.component.css']
})
export class IndivisualBillComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
