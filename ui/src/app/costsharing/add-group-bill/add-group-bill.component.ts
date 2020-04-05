import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

interface Validity {
  username: string;
  password: string;
  available: boolean;
}

@Component({
  selector: 'app-add-group-bill',
  templateUrl: './add-group-bill.component.html',
  styleUrls: ['./add-group-bill.component.css']
})
export class AddGroupBillComponent implements OnInit {
  username = '';
  divs: number[] = [0];
  valid: boolean[] = new Array(100).fill(false);
  StartVerification = false;
  inVerification = false;
  DoneVerification = false;
  currentDiv: number;
  currentUsername: string;

  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    // console.log(this.valid);
  }

  createDiv(): void {
    this.divs.push(this.divs.length + 1);
  }

  deleteDiv(divId: number): void {
    const index = this.divs.indexOf(divId);
    if (index > -1) {
      this.divs.splice(index, 1);
    }
  }

  CheckValidity(divId: number): void {
    const index = this.divs.indexOf(divId);
    this.valid[index] = true;
  }

  DivIdtoIndex(divId: number): number {
    return this.divs.indexOf(divId);
  }

  AddBillGroup(f: NgForm) {
    console.log('GROUP : ', f);
  }

  Verify(divId: number, name: string) {
    this.currentDiv = divId;
    this.currentUsername = name;
    const index = this.DivIdtoIndex(divId);
    this.VerifyUser(name).subscribe(data => {
      this.StartVerification = true;
      this.valid[this.currentDiv] = data.available && (this.currentUsername !== this.username);
      this.StartVerification = false;
    });
  }

  VerifyUser(user: string) {
    const endpoint = 'http://127.0.0.1:5000/checkUser';
    const QueryPayload = {username : user, password: 'NOTHING'};
    return this.http.post<Validity>(endpoint, QueryPayload);
  }

}
