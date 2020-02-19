import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {
  username = undefined;
  BillName = '';
  BillDescription = '';
  BillAmount: string = undefined;
  BillEnum: any = undefined;
  BillHasImage: boolean = undefined;
  BillIdentifier: string = undefined;
  BillImage: any = undefined;
  BillDate: any = undefined;
  constructor() { }

  ngOnInit() {
  }

}
