import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-successfloat',
  templateUrl: './successfloat.component.html',
  styleUrls: ['./successfloat.component.css']
})
export class SuccessfloatComponent implements OnInit {
  @Input() message = '';

  constructor() { }

  ngOnInit() {
  }

}
