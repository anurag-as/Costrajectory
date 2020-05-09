import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-errorfloat',
  templateUrl: './errorfloat.component.html',
  styleUrls: ['./errorfloat.component.css']
})
export class ErrorfloatComponent implements OnInit {
  @Input() message = '';
  constructor() { }

  ngOnInit() {
    console.log('CALLED: ', this.message);
  }

}
