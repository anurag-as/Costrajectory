import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.component.css']
})
export class LoadersComponent implements OnInit {
  status = '';
  quote = '';
  constructor() { }

  ngOnInit() {
  }

}
