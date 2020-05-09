import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


interface GetG {
  body: [];
}

@Component({
  selector: 'app-groupacceptpopup',
  templateUrl: './groupacceptpopup.component.html',
  styleUrls: ['./groupacceptpopup.component.css']
})
export class GroupacceptpopupComponent implements OnInit {
  @Input() userName;
  @Input() GroupData;
  RequestId = 1;
  constructor(private http: HttpClient, private dialogRef: MatDialogRef<GroupacceptpopupComponent>) { }

  ngOnInit() {
    // console.log('PENDING REQ: ', this.GroupData, typeof(this.GroupData));
  }

  DecisionPoster(DecisionDetails: {GroupId: number, Decision: string}) {
    // console.log('DECISION GOT : ', DecisionDetails);
    // this.GetAllGroupData();
    this.PostDecision(DecisionDetails.GroupId, DecisionDetails.Decision);
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
        this.GroupData = data.body.body;
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
