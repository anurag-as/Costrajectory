import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigsService {
  username: string;
  password: string;
  constructor() { }

  get GetUserName() {
    console.log('Urn queries: ', this.username);
    return this.username;
  }

  set UserName(USERNAME: string) {
    this.username = USERNAME;
    console.log('GLOBAL SET USERNAME: ', this.username);
  }


  public SetUserNamePassword(USERNAME: string, PASSWORD ?: string) {
    this.username = USERNAME;
    console.log('GLOBAL SET USERNAME: ', this.username);
    this.password = PASSWORD;
    }

  public GetUsername() {
    console.log('Urn queries: ', this.username);
    return this.username;
  }
}
