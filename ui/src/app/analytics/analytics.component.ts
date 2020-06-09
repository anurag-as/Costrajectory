import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

interface BillData {
  username: string;
  TableEntries: [];
  ImageEntries: [];
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  ngOnInit() {}
  constructor() {}
}

