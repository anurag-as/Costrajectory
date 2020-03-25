import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

interface Authreturn {
    username: string;
    password: string;
    available: boolean;
    Premium: boolean;
}

interface Result {
    username: string;
    password: string;
    registered: boolean;
    token: string;
    Premium: boolean;
}

@Injectable({providedIn : 'root'} )
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, passwrd: string, isPremium: boolean) {
        // console.log('INSIDE SIGNUP SERVICE ', email, passwrd);
        return this.http.post<Authreturn>('http://127.0.0.1:5000/checkUser', {username: email, password: passwrd, Premium: isPremium});
    }

    register(email: string, passwrd: string, isPremium: boolean) {
        // console.log('REGISTER USER', email, passwrd);
        return this.http.post<Result>('http://127.0.0.1:5000/registerUser', {username: email , password: passwrd, Premium: isPremium});
    }
}
