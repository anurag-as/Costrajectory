import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgZone} from '@angular/core';

interface TokenValidity {
    valid: boolean;
}

@Injectable({providedIn : 'root'} )
export class SessionStorage {
    constructor(private http: HttpClient, private Route:Router, private ngZone:NgZone) {}
    hasKey() {
        if (sessionStorage.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    getKey() {
        if (sessionStorage.length > 0) {
            for (let i = 0; i < sessionStorage.length; i++) {
                const token = sessionStorage.key(i);
                const value = sessionStorage.getItem(token);
                console.log('GOT THE KEY');
                return ({key : token, username : value});
              }
          } else {
            return ({key : undefined, username : undefined});
          }
    }

    setKey(token: string, username: string) {
        const key = token;
        sessionStorage.setItem(key, username);
        console.log('SET THE KEY ', token, username);
    }

    deleteKey() {
        console.log('DELETED THE KEY');
        sessionStorage.clear();
        // this.Route.navigate(['/logout']);
        // this.ngZone.run(() => this.Route.navigateByUrl('login'));
    }

    ValidateToken(Token: string, Username: string) {
        console.log('VALIDATION CHECKING');
        const endpoint = 'http://127.0.0.1:5000/checkValidity';
        return this.http.post<TokenValidity>(endpoint, {username: Username, token: Token});
    }
}