import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-others',
  templateUrl: './share-others.component.html',
  styleUrls: ['./share-others.component.css']
})
export class ShareOthersComponent implements OnInit {
  @Input() SharedEntry;
  @Input() AliasData;
  @Input() GroupName = undefined;
  GroupNameTruncated: string;
  constructor() { }

  ngOnInit() {
    // console.log('GROUP LEAF: ', this.SharedEntry, this.AliasData, this.AliasData[this.SharedEntry[0]].alias);
    if ( this.GroupName !== undefined && this.GroupName.length >= 10) {
      this.GroupNameTruncated = this.GroupName.substring (0, 8);
      this.GroupNameTruncated = this.GroupNameTruncated + '...' ;
    } else {
      this.GroupNameTruncated = this.GroupName;
    }
  }

}
