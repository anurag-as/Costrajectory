import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface GetStatus {
  group_admin_approvals: { add: [], remove: [] };
  personal_requests: [];
}

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
  // Group Accept -> Accept/Reject
  // Admin Add Accept -> Add user API
  // Admin Add Reject ->  Remove user API
  // Admin Remove Accept -> Remove user API
  // Admin Remove Reject ->  NEW API
  constructor(private http: HttpClient) { }

  AdminAddRequest(requesttType: number, userName: string, decision: string, groupId: number, AffectedUser: string) {
    let endpoint = 'http://127.0.0.1:5000/group/addUsersGroup';
    if (decision === 'rejected') {
      endpoint = 'http://127.0.0.1:5000/group/removeUsersGroup';
    }
    const payload = {user_name: userName, group_id: groupId.toString(), users: [AffectedUser], group_admin: userName};
    return this.http.post(endpoint , payload);
  }

  AdminRejectRequest(requesttType: number, userName: string, decision: string, groupId: number, AffectedUser: string) {
    let endpoint = 'http://127.0.0.1:5000/group/removeUsersGroup';
    if (decision === 'rejected') {
      endpoint = 'http://127.0.0.1:5000/group/removeUsersGroup_';
    }
    const payload = {user_name: userName, group_id: groupId.toString(), users: [AffectedUser], group_admin: userName};
    return this.http.post(endpoint , payload);
  }

  AdminGroupRequest(requesttType: number, userName: string, decision: string, groupId: number) {
    // if (decision === 'accepted') {} else if ( decision === 'rejected') {}
    const endpoint = 'http://127.0.0.1:5000/group/groupStatus';
    const payload = {group_status: [[String(groupId), decision]], user_name: userName};
    return this.http.post(endpoint , payload);
  }
}
