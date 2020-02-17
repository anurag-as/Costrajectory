import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-view-table-bill',
  templateUrl: './view-table-bill.component.html',
  styleUrls: ['./view-table-bill.component.css']
})
export class ViewTableBillComponent implements OnInit {
  @Input() BillName: string = undefined;
  @Input() BillDescription = '';
  @Input() BillAmount: string = undefined;
  @Input() BillEnum: any = undefined;
  @Input() BillHasImage: boolean = undefined;
  @Input() BillIdentifier: string = undefined;
  @Input() BillImage: any = undefined;
  @Input() BillDate: any = undefined;

  constructor() { }

  ngOnInit() {
  }

}
