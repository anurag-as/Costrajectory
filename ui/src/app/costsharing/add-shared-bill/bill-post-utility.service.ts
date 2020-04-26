import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';

interface Status {
  message: string;
  uploadStatus: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class BillPostUtilityService {

  constructor(private http: HttpClient) { }

  UploadBillToServer(f: NgForm, username: string, fileToUpload: File, GroupID: number, Participants: string[], SharedValue: number[]) {
    console.log('SHARED BILL :', f, username, fileToUpload, GroupID, Participants, SharedValue, f.value.Payee);
    const Endpoint = 'http://127.0.0.1:5000/addGroupBill';
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('description', f.value.des);
    formData.append('title', f.value.name);
    formData.append('date', f.value.date);
    formData.append('amount', f.value.val);
    formData.append('category', f.value.cat);
    formData.append('payer', f.value.Payee);
    formData.append('group_id', String(GroupID));
    formData.append('shares', this.NameToValueMapper(Participants, SharedValue));
    // console.log('TO check username: ', username);
    if (fileToUpload === null || fileToUpload === undefined) {
        console.log('NO IMAGE');
    } else {
        console.log(f.value, fileToUpload.name);
        formData.append('imageName', fileToUpload.name);
        formData.append('image', fileToUpload, fileToUpload.name);
    }
    // formData.append('body', fileToUpload, fileToUpload.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<Status>(Endpoint, formData, {headers});
  }

  NameToValueMapper(Participants: string[], SharedValue: number[]) {
    // tslint:disable-next-line:prefer-const
    let ConsolidatedListOfJSON = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < Participants.length; i = i + 1) {
      ConsolidatedListOfJSON.push('[' + String([Participants[i], SharedValue[i]]) + ']');
    }
    // console.log('SHARES: ', ConsolidatedListOfJSON, '[' + String(ConsolidatedListOfJSON) + ']');
    return '[' + String(ConsolidatedListOfJSON) + ']';
  }

  UploadBillToServer_edit(f: NgForm, username: string, fileToUpload: File, GroupID: number, Participants: string[], SharedValue: number[]) {
    console.log('SHARED BILL :', f, username, fileToUpload, GroupID, Participants, SharedValue, f.value.Payee);
    const Endpoint = 'http://127.0.0.1:5000/addGroupBill_';
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('description', f.value.des);
    formData.append('title', f.value.name);
    formData.append('date', f.value.date);
    formData.append('amount', f.value.val);
    formData.append('category', f.value.cat);
    formData.append('payer', f.value.Payee);
    formData.append('group_id', String(GroupID));
    formData.append('shares', this.NameToValueMapper(Participants, SharedValue));
    // console.log('TO check username: ', username);
    if (fileToUpload === null || fileToUpload === undefined) {
        console.log('NO IMAGE');
    } else {
        console.log(f.value, fileToUpload.name);
        formData.append('imageName', fileToUpload.name);
        formData.append('image', fileToUpload, fileToUpload.name);
    }
    // formData.append('body', fileToUpload, fileToUpload.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<Status>(Endpoint, formData, {headers});
  }

}
