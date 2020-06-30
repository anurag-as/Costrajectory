import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dot-pointer-dot-down',
  templateUrl: './dot-pointer-dot-down.component.html',
  styleUrls: ['./dot-pointer-dot-down.component.css']
})
export class DotPointerDotDOWNComponent implements OnInit {
  @Input() BubbleColor;
  @Input() line1 = '';
  @Input() line2 = '';
  @Input() Descriptor = '';
  @Input() Date;
  constructor() { }

  ngOnInit() {
  }

}
