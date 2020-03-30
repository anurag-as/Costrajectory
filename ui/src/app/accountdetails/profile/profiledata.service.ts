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
    const endpoint = 'http://127.0.0.1:5000/account/profile';
    return this.http.get<ProfileDetails>(endpoint, {
        params: {
          user_name : UserName,
        },
        observe: 'response'
      });
  }

  SetData(UserName: string, f: NgForm) {

    const formData: FormData = new FormData();
    const endpoint = 'http://127.0.0.1:5000/account/profile';

    formData.append('firstName', f.value.Fname);
    formData.append('lastName', f.value.Lname);
    formData.append('userName', UserName);
    formData.append('email', f.value.alternateEmail);
    formData.append('address', f.value.Addr1);
    formData.append('address2', f.value.Addr2);
    formData.append('dob', f.value.DOB);
    formData.append('gender', f.value.Gender);
    formData.append('country', f.value.Country);
    formData.append('state', f.value.State);
    formData.append('zip_code', f.value.Zip);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<Status>(endpoint, formData, {headers});

  }
}
