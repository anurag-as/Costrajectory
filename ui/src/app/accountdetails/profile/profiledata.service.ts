import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

interface ProfileDetails {
    email: string;
    dob: Date;
    gender: string;
    first_name: string;
    last_name: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    zip_code: number;
}

interface Status {
    UploadStatus: boolean;
    message: string;
}

@Injectable({
  providedIn: 'root'
})
export class Profileservice {
  profiledata;

  constructor(private http: HttpClient) { }

  GetData(UserName: string) {
    const endpoint = 'http://127.0.0.1:5000/profileDetails';
    return this.http.get<ProfileDetails>(endpoint, {
        params: {
          user_name : UserName,
        },
        observe: 'response'
      });
  }

  SetData(UserName: string, f: NgForm) {
    // console.log('FORM: ', f);
    const formData: FormData = new FormData();
    const endpoint = 'http://127.0.0.1:5000/profileDetails';

    formData.append('first_name', f.value.first_name);
    formData.append('last_name', f.value.last_name);
    formData.append('user_name', UserName);
    formData.append('email', f.value.email);
    formData.append('address', f.value.address);
    formData.append('address2', f.value.address2);
    formData.append('dob', f.value.dob);
    formData.append('gender', f.value.gender);
    formData.append('country', f.value.country);
    formData.append('state', f.value.state);
    formData.append('zip_code', f.value.zip_code);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<Status>(endpoint, formData, {headers});

  }
}
