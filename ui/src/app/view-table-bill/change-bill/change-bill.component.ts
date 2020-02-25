import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-change-bill',
  templateUrl: './change-bill.component.html',
  styleUrls: ['./change-bill.component.css']
})
export class ChangeBillComponent implements OnInit {
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
    console.log(this.BillDate);
  }

  SubmitChanges() {}
}
