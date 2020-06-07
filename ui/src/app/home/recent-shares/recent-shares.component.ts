import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recent-shares',
  templateUrl: './recent-shares.component.html',
  styleUrls: ['./recent-shares.component.css']
})
export class RecentSharesComponent implements OnInit {
  @Input() SharesPayload: any;
  @Input() Username: string;
  testAlias = {
    'a@a.com': {alias: 'aa', name: false},
    'b@b.com': {alias: 'bb', name: false},
    'c@c.com': {alias: 'cc', name: false}
    };

  /* COmbinations allowed currently -->
    1. 2 settlement, 2 shares
    2. 6 settlements
    3. 1 settlement, 4 shares */
  ContentQueueSettlement: any;
  ContentQueuePay: any;
  Settlements: number;
  Shares: number;
  FinalShares: any;
  FinalSettlement: any;
  Share = ['c@c.com', 'b@b.com', 400];
  constructor() { }

  ngOnInit() {
  }

  CreateCOntentFromPayload() {
    for (const bill of this.SharesPayload) {
      const tempQueueSettle = [];
      const tempQueuePay = [];
      for ( const share of bill.settlements) {
        if (this.Username === share[1]) {
          tempQueueSettle.push(share[0]);
        } else if (this.Username === share[0]) {
          tempQueuePay.push(share[1]);
        }
      }
      this.ContentQueuePay.push(tempQueuePay);
      this.ContentQueueSettlement.push(tempQueueSettle);
    }
  }

  RandomSettlementSelector() {
    // Initialize the numbers
    this.Shares = Math.min( 2, this.ContentQueuePay.length);
    this.Settlements = Math.min( 6 - this.Shares * 2, this.ContentQueueSettlement.length );

    while (this.Shares > 0) {
      const removedBit = this.ContentQueuePay.shift();
      const removedElement = removedBit.shift();
      this.FinalShares.push(removedElement);
      this.Shares -= 1;
      this.ContentQueuePay.push(removedBit);
    }

    while (this.Settlements > 0) {
      const removedBit = this.ContentQueueSettlement.shift();
      const removedElement = removedBit.shift();
      this.FinalSettlement.push(removedElement);
      this.Settlements -= 1;
      this.ContentQueueSettlement.push(removedBit);
    }

  }

}
