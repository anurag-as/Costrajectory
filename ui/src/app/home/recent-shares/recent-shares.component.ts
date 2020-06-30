import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GlobalConfigsService } from '../../global-configs.service';
import {HttpHeaders} from '@angular/common/http';

interface Billdata {
  body: any[];
}

interface Status {
  message: string;
  uploadStatus: boolean;
}

@Component({
  selector: 'app-recent-shares',
  templateUrl: './recent-shares.component.html',
  styleUrls: ['./recent-shares.component.css']
})
export class RecentSharesComponent implements OnInit {
  @Input() SharesPayload: any;
  @Input() Username: string;
  @Output() RefreshLogs = new EventEmitter();

  /* COmbinations allowed currently -->
    1. 2 settlement, 2 shares
    2. 6 settlements
    3. 1 settlement, 4 shares */
  NumberOfShare = 0;
  NumberOfSettlements = 0;
  ContentQueueSettlement: any[] = [];
  ContentQueuePay: any[] = [];
  Settlements: number;
  Shares: number;
  FinalShares: any[] = [];
  FinalSettlement: any[] = [];
  listLeft: any[];
  listRight: any[];
  listLeft2: any[];
  listRight2: any[];

  constructor(private Globals: GlobalConfigsService, private http: HttpClient) {
    this.Username = Globals.GetUserName;
  }

  ngOnInit() {
    this.ReloadPage().subscribe(data => {
      this.ResetValues();
      this.SharesPayload = data.body;
      // console.log('GROUP DATA HOME: ', data.body);
      this.CreateCOntentFromPayload();
      this.RandomSettlementSelector();
      this.PrepareLists();
      }, err => {
      this.SharesPayload = [];
    });
    }

  CreateCOntentFromPayload() {
    for (const bill of this.SharesPayload) {
      const tempQueueSettle = [];
      const tempQueuePay = [];
      for ( const share of bill.cost_sharing.settlements) {
        if (this.Username === share[1]) {
          tempQueueSettle.push({participant : share[0],
                                amount: share[2],
                                groupName: bill.group_info.title,
                                groupId: bill.group_info.group_id,
                                aliasData: bill.user_details,
                                type: 1,
                                shares: share,
                                bill: bill.group_info});
          this.NumberOfSettlements += 1;
        } else if (this.Username === share[0]) {
          tempQueuePay.push({participant : share[1],
                              amount: share[2],
                              groupName: bill.group_info.title,
                              groupId: bill.group_info.group_id,
                              aliasData: bill.user_details,
                              type: 2,
                              shares: share,
                              bill: bill.group_info});
          this.NumberOfShare += 1;
        }
        // console.log('TEMP SETTLE: ', tempQueueSettle, tempQueueSettle.length, tempQueueSettle[0], tempQueueSettle[1]);
      }
      if (tempQueuePay.length !== 0 ) {
        this.ContentQueuePay.push(tempQueuePay);
      }
      if (tempQueueSettle.length !== 0 ) {
        this.ContentQueueSettlement.push(tempQueueSettle);
      }
    }
  }

  RandomSettlementSelector() {
    // Initialize the numbers
    this.Settlements = Math.min( 2, this.NumberOfSettlements);
    this.Shares = Math.min( 6 - this.Shares * 2, this.NumberOfShare );

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

    // console.log('SETTLEMENTS :', this.FinalSettlement);
    // console.log('SHARES :', this.NumberOfShare);

  }

  ReloadPage() {
    const endpoint = 'http://127.0.0.1:5000/group/viewGroup';
    const QueryPayload = {user_name : this.Globals.GetUsername()};
    return this.http.post<Billdata>(endpoint, QueryPayload);
  }

  PostSettlement( postValues: {payer: string, value: number, GroupId: number}) {
    this.UploadBillToServer(this.Username, postValues.GroupId, postValues.payer, postValues.value).subscribe( x => {
      // console.log('STATUS MESSAGE ', x);
      this.ReloadPage().subscribe(data => {
        this.ResetValues();
        this.SharesPayload = data.body;
        // console.log('GROUP DATA HOME: ', data.body);
        this.CreateCOntentFromPayload();
        this.RandomSettlementSelector();
        this.PrepareLists();
        this.RefreshLogs.emit();
        }, err => {
        this.SharesPayload = [];
        });
      });
  }

  UploadBillToServer(username: string, GroupID: number, payee: string, amount: number) {
    // console.log('SHARED BILL :', f, username, fileToUpload, GroupID, Participants, SharedValue, f.value.Payee);
    const Endpoint = 'http://127.0.0.1:5000/group/addGroupBill';
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('description', '');
    formData.append('title', 'Settlement Bill');
    formData.append('date', '');
    formData.append('amount', String(amount));
    formData.append('category', 'settlement');
    formData.append('payer', payee);
    formData.append('group_id', String(GroupID));
    formData.append('shares', this.NameToValueMapper([payee, username], [0, amount]));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<Status>(Endpoint, formData, {headers});
  }

  NameToValueMapper(Participants: string[], SharedValue: number[]) {
    // tslint:disable-next-line:prefer-const
    let ConsolidatedListOfJSON = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < Participants.length; i = i + 1) {
      ConsolidatedListOfJSON.push('[' + String([Participants[i], SharedValue[i]]) + ']');
    }
    // console.log('SHARES: ', ConsolidatedListOfJSON, '[' + String(ConsolidatedListOfJSON) + ']');
    return '[' + String(ConsolidatedListOfJSON) + ']';
  }

  PrepareLists() {
    for (const [index, value] of this.FinalSettlement.entries()) {
      index % 2 === 0 ? this.listLeft.push(value) : this.listRight.push(value);
    }
    for (const [index, value] of this.FinalShares.entries()) {
      index % 2 === 0 ? this.listLeft2.push(value) : this.listRight2.push(value);
    }
  }

  ResetValues() {
    this.NumberOfShare = 0;
    this.NumberOfSettlements = 0;
    this.ContentQueueSettlement = [];
    this.ContentQueuePay = [];
    this.Settlements = 0;
    this.Shares = 0;
    this.FinalShares = [];
    this.FinalSettlement = [];
    this.listLeft = [];
    this.listRight = [];
    this.listLeft2 = [];
    this.listRight2 = [];

  }

}
