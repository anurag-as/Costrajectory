import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class LoggingService {
    consolidatedLog = undefined;
    constructor(private http: HttpClient) {}

    GetLogs(UserName: string) {
        const endpoint = 'http://127.0.0.1:5000/getRecentLogsAPI';
        return this.http.get(endpoint, {
            params: {
                username : UserName,
            },
            observe: 'response'
          });
    }

    ReturnLogs(UserName: string): any {
        this.GetLogs(UserName).subscribe(data => {
            // console.log('LOG : ', data);
            return this.ConvertArrayTolog(data.body);
        }, err => {
            return '';
        });
    }

    ConvertArrayTolog(Log: any): string {
        this.consolidatedLog = undefined;
        for (const entry of Log) {
            if (entry[2] !== '') {
                if ( this.consolidatedLog === undefined ) {
                    this.consolidatedLog = entry[0] + ' : ' + entry[1] + ' : ' + entry[2];
                } else {
                    this.consolidatedLog = this.consolidatedLog + '\n' + entry[0] + ' : ' + entry[1] + ' : ' + entry[2];
                }
            } else {
                if ( this.consolidatedLog === undefined ) {
                    this.consolidatedLog = entry[0] + ' : ' + entry[1];
                } else {
                    this.consolidatedLog = this.consolidatedLog + '\n' + entry[0] + ' : ' + entry[1];
                }
            }
        }
        // console.log('LOG CONSOLIDATED : ', this.consolidatedLog);
        return this.consolidatedLog;
    }
}
