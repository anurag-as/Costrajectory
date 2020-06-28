import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { GlobalConfigsService } from '../../global-configs.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Key } from 'protractor';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  numbers = Array(50).fill(0).map((x, i) => i);
  InitialState = 0;
  LogData: any = undefined;
  state = 1;
  @Input() ShouldLogsBeChanged;
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
    // tslint:disable-next-line:no-bitwise
    this.state ^= 1;
    this.GetLogs(this.Globals.GetUserName).subscribe(data => {
      this.LogData = data.body;
      // this.LogData.reverse();
      // console.log('LOG DATA : ', this.LogData);
      this.LogData = this.PrepareLogData(this.LogData);
    }, err => {
      this.LogData = undefined;
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(chg) {
    this.ngOnInit();
  }

  PrepareLogData(LogData) {
    const PreparedLogData = [];
    const KeySet = new Set();
    // Prepare a set of all Key Entries
    for ( const log of LogData) {
      KeySet.add(parseInt(log[1].split(':')[0], 10));
    }

    // Generate n random random numbers = len(KeySet)
    const RandomNumbersMapper: any = [];
    for ( const element of KeySet) {
      const RandomColor = '#' + Math.random().toString(16).substr(2, 6);
      RandomNumbersMapper.push( { key : element, color : RandomColor});
    }
    // console.log('RANDOM COLORS : ', RandomNumbersMapper, KeySet);
    // Add a different Handling for each
    const FinalData = [];
    for ( const log of LogData) {
      const element = parseInt(log[1].split(':')[0], 10);
      const data = log[1].split(':')[1];
      const title = log[2];
      // FORMAT ==> Activity, Activity Specs(if any), Title when hovered, Color, Date, state
      switch (element) {
        case 1:
        case 2:
        case 3:
          // FinalData.push(['Profile Updated', '',  title , this.GetColor( element, RandomNumbersMapper) , log[0], this.state]);
          // break;

        case 4:
        case 14:
        case 20:
          FinalData.push([data, '', title , this.GetColor( element, RandomNumbersMapper), log[0], this.state]);
          break;

        case 5:
          const splitData1 = data.split(' ');
          const right1 =  splitData1.slice(3, splitData1.length).join(' ');
          const left1 = splitData1.slice(0, splitData1.length - 1).join(' ');
          FinalData.push(['Group Bill Added', right1,  title , this.GetColor( element, RandomNumbersMapper) , log[0], this.state]);
          break;

        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 21:
        case 22:
          const splitData = data.split(' ');
          const right = splitData[ splitData.length - 1 ];
          const left = splitData.slice(0, splitData.length - 1).join(' ');
          FinalData.push([left, right,  title , this.GetColor( element, RandomNumbersMapper) , log[0], this.state]);
          break;

        case 24:
          const splitData3 = data.split(' ');
          const right3 =  splitData3.slice(4, splitData3.length).join(' ');
          const left3 = splitData3.slice(0, splitData3.length - 1).join(' ');
          FinalData.push(['Group Settlement', right3,  title , this.GetColor( element, RandomNumbersMapper) , log[0], this.state]);
          break;
      }
      // tslint:disable-next-line:no-bitwise
      this.state ^= 1;
    }
    // console.log('PREPARED DATA : ', FinalData);
    return FinalData;
  }

  GetLogs(UserName: string) {
    const endpoint = 'http://127.0.0.1:5000/transactions/getRecentLogs';
    return this.http.get(endpoint, {
        params: {
            user_name : UserName,
            limit: '100'
        },
        observe: 'response'
      });

  }

  GetColor(keyunique, payload) {
    for (const ele of payload) {
      if ( ele.key === keyunique) {
        return ele.color;
      }
    }
  }
}
