import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestHandlerService } from '../request-handler.service';

interface GetG {
  group_admin_approvals: { add: [], remove: [] };
  personal_requests: [];
}

@Component({
  selector: 'app-groupacceptpopup',
  templateUrl: './groupacceptpopup.component.html',
  styleUrls: ['./groupacceptpopup.component.css']
})
export class GroupacceptpopupComponent implements OnInit {
  @Input() userName;
  @Input() GroupData;
  @Input() PeopleAdd;
  @Input() PeopleRemove;
  @Input() RequestId = 1;
  @Input() UserToBeAddedOrRemoved: string;

  constructor(private http: HttpClient,
              private dialogRef: MatDialogRef<GroupacceptpopupComponent>,
              private requestService: RequestHandlerService) { }

  ngOnInit() {
    // console.log('PENDING REQ: ', this.GroupData, typeof(this.GroupData));
    // this.dialogRef.updateSize();
  }

  DecisionPoster(DecisionDetails: {GroupId: number, Decision: string}) {
    // console.log('DECISION GOT : ', DecisionDetails);
    // this.GetAllGroupData();
    this.PostDecision(DecisionDetails.GroupId, DecisionDetails.Decision);
  }

  DecisionGroup(DecisionDetails: {GroupId: number, Decision: string, RequestType: number}) {
    // console.log('DECISION GOT : ', DecisionDetails);
    // tslint:disable-next-line:max-line-length
    this.requestService.AdminGroupRequest( DecisionDetails.RequestType, this.userName, DecisionDetails.Decision, DecisionDetails.GroupId).subscribe(data => {
      // console.log('DECISION POSTED : ', DecisionDetails);
      this.GetAllGroupData();
    });
  }

  DecisionAdminAdd(DecisionDetails: {GroupId: number, Decision: string, RequestType: number, UserUnderConsideration: string}) {
    // tslint:disable-next-line:max-line-length
    this.requestService.AdminAddRequest( DecisionDetails.RequestType, this.userName, DecisionDetails.Decision, DecisionDetails.GroupId, DecisionDetails.UserUnderConsideration).subscribe(data => {
      this.GetAllGroupData();
    });
  }

  DecisionAdminRemove(DecisionDetails: {GroupId: number, Decision: string, RequestType: number, UserUnderConsideration: string}) {
    // tslint:disable-next-line:max-line-length
    this.requestService.AdminRejectRequest( DecisionDetails.RequestType, this.userName, DecisionDetails.Decision, DecisionDetails.GroupId, DecisionDetails.UserUnderConsideration).subscribe(data => {
      this.GetAllGroupData();
    });
  }

  PostDecision(GroupId: number, Decision: string) {
    const endpoint = 'http://127.0.0.1:5000/group/groupStatus';
    const templatePayload = [[String(GroupId), Decision]];
    this.http.post(endpoint, {group_status: templatePayload, user_name: this.userName.username}).subscribe(data => {
      this.GetAllGroupData();
    });
  }

  GetAllGroupData() {
      this.GetAllGroupDataFromServer(this.userName.username).subscribe(data => {
        // console.log('INSIDE POP UP: ', data.body);
        this.GroupData = data.body.personal_requests;
        this.PeopleAdd = data.body.group_admin_approvals.add;
        this.PeopleRemove = data.body.group_admin_approvals.remove;
      });
    }

  GetAllGroupDataFromServer(UserName: string) {
      const endpoint = 'http://127.0.0.1:5000/group/pendingRequests';
      // console.log('(((( ', UserName);
      return this.http.get<GetG>(endpoint, {
          params: {
              user_name : UserName,
          },
          observe: 'response'
        });
    }

    private closeDialog() {
      this.dialogRef.close();
    }

    ParseInt(a, b) {
      return parseInt(a, b);
    }

    ChangeRequestType(request) {
      this.RequestId = request;
    }

}
