import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalConfigsService } from '../../global-configs.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  numbers = Array(50).fill(0).map((x, i) => i);
  InitialState = 0;
  LogData: any = undefined;
  @ViewChild('Timeline', { read: ElementRef, static: false }) Timeline: ElementRef;

  public scrollRight(): void {
    this.InitialState = this.Timeline.nativeElement.scrollLeft + 300;
    this.Timeline.nativeElement.scrollTo({ left: (this.Timeline.nativeElement.scrollLeft + 300), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.Timeline.nativeElement.scrollTo({ left: (this.Timeline.nativeElement.scrollLeft - 300), behavior: 'smooth' });
    this.InitialState = Math.max(this.Timeline.nativeElement.scrollLeft - 300, 0);
  }

  constructor(private Globals: GlobalConfigsService, private http: HttpClient) { }

  ngOnInit() {
    this.GetLogs(this.Globals.GetUserName).subscribe(data => {
      this.LogData = data.body;
      console.log('LOG DATA STUB: ', this.LogData);
    }, err => {
      this.LogData = undefined;
    });
  }

  GetLogs(UserName: string) {
    const endpoint = 'http://127.0.0.1:5000/transactions/getRecentLogs';
    return this.http.get(endpoint, {
        params: {
            user_name : UserName,
        },
        observe: 'response'
      });

  }
}
