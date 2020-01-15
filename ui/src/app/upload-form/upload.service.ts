import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


interface Status {
    UploadStatus: boolean;
}

@Injectable({providedIn : 'root'} )
export class UploadService {
    constructor(private http: HttpClient) {}

    postFile(fileToUpload: File) {
        const endpoint = '';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.http.post<Status>(endpoint, formData);
    }
}
