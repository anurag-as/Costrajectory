import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-dot-pointer-dot-up',
  templateUrl: './dot-pointer-dot-up.component.html',
  styleUrls: ['./dot-pointer-dot-up.component.css']
})
export class DotPointerDotUPComponent implements OnInit {
  @Input() BubbleColor;
  constructor() { }

  ngOnInit() {
  }

}
