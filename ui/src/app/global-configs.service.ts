import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigsService {
  username: string;
  password: string;
  isPremium = false;
  constructor() { }

  get GetUserName() {
    // console.log('Urn queries: ', this.username);
    return this.username;
  }

  set premium(isPremium: boolean) {
    this.isPremium = isPremium;
  }

  get premium() {
    return this.isPremium;
  }

  public setPremiumStatus(isPremium: boolean) {
    this.isPremium = isPremium;
  }

  set UserName(USERNAME: string) {
    this.username = USERNAME;
    // console.log('GLOBAL SET USERNAME: ', this.username);
  }


  public SetUserNamePassword(USERNAME: string, PASSWORD ?: string) {
    this.username = USERNAME;
    // console.log('GLOBAL SET USERNAME: ', this.username);
    this.password = PASSWORD;
    }

  public GetUsername() {
    return this.username;
  }
}
