import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

interface BugIdReturn {
  BugId: string;
}

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.component.html',
  styleUrls: ['./bugreport.component.css']
})
export class BugreportComponent implements OnInit {
  ReportTitle = '';
  ReportDesctiption = '';
  BugId = undefined;
  PostedBugReport = false;
  GotBugID = false;
  constructor(private dialogRef: MatDialogRef<BugreportComponent>, private http: HttpClient) { }

  ngOnInit() {
  }

  CloseDiaglog() {
    this.dialogRef.close();
  }

  SubmitReport() {
    this.PostedBugReport = true;
    this.dialogRef.disableClose = true;
    this.SubmitReportPosterService().subscribe( data => {
      this.BugId = data.BugId;
      this.PostedBugReport = false;
      this.GotBugID = true;
      this.dialogRef.disableClose = false;
    });
  }


  SubmitReportPosterService() {
    const endpoint = 'http://127.0.0.1:5000/utils/bugs';
    const query = {
      title : this.ReportTitle,
      description: this.ReportDesctiption
    };
    return this.http.post<BugIdReturn>(endpoint, query);
  }

}
