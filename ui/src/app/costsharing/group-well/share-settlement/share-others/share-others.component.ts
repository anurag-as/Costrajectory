import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-others',
  templateUrl: './share-others.component.html',
  styleUrls: ['./share-others.component.css']
})
export class ShareOthersComponent implements OnInit {
  @Input() SharedEntry;
  @Input() AliasData;
  constructor() { }

  ngOnInit() {
    console.log('GROUP LEAF: ', this.SharedEntry, this.AliasData, this.AliasData[this.SharedEntry[0]].alias);
  }

}
