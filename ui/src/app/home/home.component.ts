import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GlobalConfigsService } from '../global-configs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Globals: GlobalConfigsService, private http: HttpClient) { }

  ngOnInit() {
  }

}
