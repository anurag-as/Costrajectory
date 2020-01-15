import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';


interface Result {
    valid: string;
}

@Injectable({providedIn : 'root'} )
export class AuthService {
    constructor(private http: HttpClient) {}

    signin(email: string, passwrd: string) {
        return this.http.post<Result>('http://127.0.0.1:5000/signin',{username: email, password: passwrd});
    }

}
