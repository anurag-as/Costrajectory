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

@Injectable({providedIn : 'root'} )
export class GetAllTransactionDetails {
    constructor(private http: HttpClient) {}

    GetData(UserName: string) {
        const endpoint = 'http://127.0.0.1:5000/transactions/getRecentTransactions';
        return this.http.post<BillData>(endpoint, {username: UserName});
    }
}
