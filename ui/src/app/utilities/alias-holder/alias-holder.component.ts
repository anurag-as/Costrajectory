import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { RandomColor } from 'angular-randomcolor';


@Component({
  selector: 'app-alias-holder',
  templateUrl: './alias-holder.component.html',
  styleUrls: ['./alias-holder.component.css']
})
export class AliasHolderComponent implements OnInit {
  @Input() Username = undefined;
  @Input() Alias: string;
  newColor: string;
  constructor() { }

  ngOnInit() {
    this.newColor = RandomColor.generateColor();
    console.log('SVG: ', this.Alias, this.newColor);
  }

}
