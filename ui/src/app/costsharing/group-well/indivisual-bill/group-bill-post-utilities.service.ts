import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

interface Status {
  message: string;
  uploadStatus: boolean;
}

interface ReturnImage {
  Image: any;
}

@Injectable({
  providedIn: 'root'
})
export class GroupBillPostUtilitiesService {

  constructor(private http: HttpClient) { }

  DeleteRequestToServer(USERNAME: string, GID: string, BID: string, MAPPEDNAME: string) {
    const endpoint = 'http://127.0.0.1:5000/group/deleteGroupBill';
    const query = {
      username : USERNAME,
      group_id : GID,
      bill_id : BID,
      mapped_name : MAPPEDNAME
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: query
    };
    // console.log('delete bill :', options);
    return this.http.delete<Status>(endpoint, options);
  }

  receiveImage(MappedImageName , BillName, USERNAME) {
    const endpoint = 'http://127.0.0.1:5000/transactions/previewImage';
    const QueryPayload = {mapped_name : MappedImageName, bill_title: BillName, username: USERNAME};
    return this.http.post<ReturnImage>(endpoint, QueryPayload);
  }

}
