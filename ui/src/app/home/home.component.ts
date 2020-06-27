import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GlobalConfigsService } from '../global-configs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LogChange = 0;
  constructor(private Globals: GlobalConfigsService, private http: HttpClient) { }

  ngOnInit() {
  }

  ChangeLogStatus() {
    // tslint:disable-next-line:no-bitwise
    this.LogChange ^= 1;
  }

}
