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

    postFile(fileToUpload: File, f: NgForm) {
        console.log(f.value, fileToUpload.name);
        const endpoint = 'http://127.0.0.1:8000/test';
        const formData: FormData = new FormData();
        // formData.append('body', fileToUpload, fileToUpload.name);
        formData.append('image', fileToUpload, fileToUpload.name);
        
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.http.post<Status>(endpoint, formData, {headers});
    }
}
