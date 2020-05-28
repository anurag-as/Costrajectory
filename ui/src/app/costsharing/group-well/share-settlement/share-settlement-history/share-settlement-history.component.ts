import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-settlement-history',
  templateUrl: './share-settlement-history.component.html',
  styleUrls: ['./share-settlement-history.component.css']
})
export class ShareSettlementHistoryComponent implements OnInit {
  @Input() payer;
  @Input() payee;
  @Input() amount;
  @Input() SingleHistory;
  @Input() AliasData;
  constructor() { }

  ngOnInit() {
    this.payer = this.SingleHistory.share[0][0];
    this.payee = this.SingleHistory.share[1][0];
    this.amount = parseInt(this.SingleHistory.share[1][1], 10);
  }

}
