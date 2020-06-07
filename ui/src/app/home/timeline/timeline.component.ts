import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  numbers = Array(50).fill(0).map((x, i) => i);
  InitialState = 0;

  @ViewChild('Timeline', { read: ElementRef, static: false }) Timeline: ElementRef;

  public scrollRight(): void {
    this.InitialState = this.Timeline.nativeElement.scrollLeft + 300;
    this.Timeline.nativeElement.scrollTo({ left: (this.Timeline.nativeElement.scrollLeft + 300), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.Timeline.nativeElement.scrollTo({ left: (this.Timeline.nativeElement.scrollLeft - 300), behavior: 'smooth' });
    this.InitialState = Math.max(this.Timeline.nativeElement.scrollLeft - 300, 0);
  }

  constructor() { }

  ngOnInit() {
  }

}
