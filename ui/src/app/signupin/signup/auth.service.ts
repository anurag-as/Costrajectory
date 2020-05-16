import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

interface Authreturn {
    username: string;
    available: boolean;
    Premium: boolean;
}

interface Result {
    username: string;
    registered: boolean;
    token: string;
    Premium: boolean;
}

@Injectable({providedIn : 'root'} )
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, passwrd: string, isPremium: any) {
        if ( isPremium === '' ) {
            isPremium = false;
        }
        // console.log('INSIDE SIGNUP SERVICE ', email, passwrd);
        return this.http.post<Authreturn>('http://127.0.0.1:5000/auth/checkUser', {username: email, password: passwrd, premium: isPremium});
    }

    register(email: string, passwrd: string, isPremium: any) {
        // console.log('REGISTER USER', isPremium);
        if ( isPremium === '' ) {
            isPremium = false;
        }
        return this.http.post<Result>('http://127.0.0.1:5000/auth/registerUser', {username: email , password: passwrd, premium: isPremium});
    }
}
