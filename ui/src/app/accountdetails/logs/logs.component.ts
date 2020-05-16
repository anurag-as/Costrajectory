import { Component, OnInit } from '@angular/core';
import { LoggingService } from './getlogs.service';
import { GlobalConfigsService } from '../../global-configs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'text', readOnly: true, fontSize: 20};
  code  = undefined;

  constructor(private Logger: LoggingService, private Globals: GlobalConfigsService) { }

  ngOnInit() {
    this.code = undefined;
    this.Logger.GetLogs(this.Globals.GetUserName).subscribe(data => {
      this.code = this.Logger.ConvertArrayTolog(data.body);
      // console.log('INISDE LOG : ', this.code);
    }, err => {
      this.code = undefined;
    });
  }

}
