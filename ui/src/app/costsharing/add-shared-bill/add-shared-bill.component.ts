import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-shared-bill',
  templateUrl: './add-shared-bill.component.html',
  styleUrls: ['./add-shared-bill.component.css']
})
export class AddSharedBillComponent implements OnInit {
  @Input() Username;
  @Input() BillId;
  constructor() { }

  ngOnInit() {
  }

}
