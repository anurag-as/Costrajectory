import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { TabularViewComponent } from './tabular-view/tabular-view.component';

interface Status {
    UploadStatus: boolean;
    message: string;
}

@Injectable({providedIn : 'root'} )
export class UploadService {
    constructor(private http: HttpClient, private TableAdder: TabularViewComponent) {}

    postFile(fileToUpload: File, f: NgForm, username: string) {
        this.TableAdder.AppendEntry(f, username);
        const endpoint = 'http://127.0.0.1:5000/uploadBill';
        const formData: FormData = new FormData();

        formData.append('username', username);
        formData.append('Description', f.value.des);
        formData.append('Name', f.value.name);
        formData.append('Date', f.value.date);
        formData.append('Amount', f.value.val);
        formData.append('category', f.value.cat);
        // console.log('TO check username: ', username);
        if (fileToUpload === null) {
            console.log('NO IMAGE');
        } else {
            console.log(f.value, fileToUpload.name);
            formData.append('FileName', fileToUpload.name);
            formData.append('image', fileToUpload, fileToUpload.name);
        }
        // formData.append('body', fileToUpload, fileToUpload.name);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.http.post<Status>(endpoint, formData, {headers});
    }


    postEditFile(fileToUpload: File, f: NgForm, username: string, BillId: any) {
        this.TableAdder.AppendEntry(f, username);
        const endpoint = 'http://127.0.0.1:5000/editTransaction';
        console.log('PATH TAKEN TO EDIT: ', f, fileToUpload);
        const formData: FormData = new FormData();
        formData.append('username', username);
        formData.append('Description', f.value.des);
        formData.append('Name', f.value.name);
        formData.append('Date', f.value.date);
        formData.append('Amount', f.value.val);
        formData.append('uid', BillId);
        formData.append('category', f.value.cat);

        // console.log('TO check username: ', username);
        if (fileToUpload === null || fileToUpload === undefined) {
            console.log('NO IMAGE');
        } else {
            console.log(f.value, fileToUpload.name);
            formData.append('FileName', fileToUpload.name);
            formData.append('image', fileToUpload, fileToUpload.name);
        }
        // formData.append('body', fileToUpload, fileToUpload.name);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.http.post<Status>(endpoint, formData, {headers});
    }

}
