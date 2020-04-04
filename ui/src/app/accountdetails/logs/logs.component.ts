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
  code  = 'wsws';

  constructor(private Logger: LoggingService, private Globals: GlobalConfigsService) { }

  ngOnInit() {
    this.code = this.Logger.ReturnLogs(this.Globals.GetUserName);
  }

}
