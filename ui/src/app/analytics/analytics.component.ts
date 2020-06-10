import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

interface BillData {
  username: string;
  TableEntries: [];
  ImageEntries: [];
}


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  Timeline = 'Week';
  Mode = 'Personal';
  Category = 'All';
  ngOnInit() {}
  constructor() {}
}

