import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ViewContainerRef, ChangeDetectorRef, AfterContentChecked} from '@angular/core';

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css'],
})
export class TabularViewComponent implements OnInit {
  BillEntries = [[2, 'testname', 'test', '20']];
  constructor() { }

  ngOnInit() {
  }

  public AppendEntry(f: NgForm, userName: string) {
    this.BillEntries.push([this.BillEntries.length + 1, f.value.name, f.value.des, f.value.date, f.value.val]);
    console.log('===============+', this.BillEntries);
  }

}
