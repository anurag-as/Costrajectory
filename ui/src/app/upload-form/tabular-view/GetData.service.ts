import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

interface BillData {
    username: string;
    TableEntries: any;
    ImageEntries: any;
}

// tslint:disable-next-line:max-line-length
// {"Name" : "Test1" , "Description": "Test Description1", "Date": "10/12/2020" , "Amount": 500, "HasImage":"True", "Itentifier": "Sample image identier1"}
// {"Itentifier": "Sample image identier3" , "Image" : "File"}

@Injectable({providedIn : 'root'} )
export class Getdata {
    constructor(private http: HttpClient) {}

    GetData() {
        const endpoint = 'http://127.0.0.1:5000/GetData';
        return this.http.post<BillData>(endpoint, {});
    }
}
