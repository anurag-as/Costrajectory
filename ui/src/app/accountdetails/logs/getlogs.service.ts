import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

interface LogDataResponse {
    Logs: any;
}

@Injectable({
    providedIn: 'root'
  })
  export class LoggingService {
    consolidatedLog = '';
    constructor(private http: HttpClient) {}

    GetLogs(UserName: string) {
        const endpoint = 'http://127.0.0.1:5000/profileDetails';
        return this.http.get<LogDataResponse>(endpoint, {
            params: {
              user_name : UserName,
            },
            observe: 'response'
          });
    }

    ReturnLogs(UserName: string) {
        this.GetLogs(UserName).subscribe(data => {
            return this.ConvertArrayTolog(data.body.Logs);
        }, err => {
            return '';
        });
    }

    ConvertArrayTolog(Log: any[]) {
        for (const entry of Log) {
            this.consolidatedLog = this.consolidatedLog + '\n' + entry;
        }
        return this.consolidatedLog;
    }
}
