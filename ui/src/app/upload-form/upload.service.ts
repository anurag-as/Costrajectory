import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

interface Status {
    UploadStatus: boolean;
}

@Injectable({providedIn : 'root'} )
export class UploadService {
    constructor(private http: HttpClient) {}

    postFile(fileToUpload: File, f: NgForm, username: string) {
        const endpoint = 'http://127.0.0.1:5000/uploadBill';
        const formData: FormData = new FormData();
        formData.append('username', username);
        formData.append('description', 'des');

        if (fileToUpload === null) {
            console.log('NO IMAGE');
        } else {
            console.log(f.value, fileToUpload.name);
            formData.append('image', fileToUpload, fileToUpload.name);
        }
       
        // formData.append('body', fileToUpload, fileToUpload.name);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.http.post<Status>(endpoint, formData, {headers});
    }
}
