import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface UsageStats {
  TotalQuota: number;
  UsedQuota: number;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigsService {
  username: string;
  password: string;
  isPremium = false;
  usageQuota = undefined;
  maxQuota = undefined;
  constructor(private http: HttpClient) { }

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

  getUsageQuota() {
    const endpoint = 'http://127.0.0.1:5000/analytics/usage';
    const QueryPayload = {username: this.username};
    return this.http.post<UsageStats>(endpoint, QueryPayload);
  }

}
