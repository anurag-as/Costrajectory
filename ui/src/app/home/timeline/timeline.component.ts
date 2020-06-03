import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  numbers = Array(50).fill(0).map((x, i) => i);
  constructor() { }

  ngOnInit() {
  }

}
