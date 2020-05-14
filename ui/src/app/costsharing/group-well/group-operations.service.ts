import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Status {
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GroupOperationsService {

  constructor(private http: HttpClient) { }

  deleteUsersFromGroup( GroupId: number, username: string, members: string[], GroupAdmin: string, NonAdminMode ?: boolean) {
    let endpoint = 'http://127.0.0.1:5000/group/removeUsersGroup';
    if (NonAdminMode === true) {
      endpoint = 'http://127.0.0.1:5000/group/removeUsersGroupNonAdmin';
    }
    const queryPayload = {user_name: username, group_id: GroupId.toString(), users: members, group_admin: GroupAdmin};
    return this.http.post<Status>(endpoint, queryPayload);
  }

  deleteGroup( GroupId: number, username: string) {
    const endpoint = 'http://127.0.0.1:5000/group/deleteGroup';
    const queryPayload = {user_name: username, group_id: GroupId.toString()};
    return this.http.post<Status>(endpoint, queryPayload);
  }

  ExitFromGroup( GroupId: number, username: string, nextAdmin?: string) {
    const endpoint = 'http://127.0.0.1:5000/group/deleteGroup';
    const queryPayload = {user_name: username, group_id: GroupId.toString()};
    if (nextAdmin) {
      this.ChangeGroupAdmin(GroupId, username, nextAdmin).subscribe(data => {
        return this.http.post<Status>(endpoint, queryPayload);
      });
    } else {
      return this.http.post<Status>(endpoint, queryPayload);
    }
  }

  ChangeGroupAdmin( GroupId: number, username: string, nextAdmin: string) {
    const endpoint = 'http://127.0.0.1:5000/group/changeGroupAdmin';
    const queryPayload = {user_name: username, group_id: GroupId.toString(), group_admin: nextAdmin};
    return this.http.post<Status>(endpoint, queryPayload);
  }

  AddUsersToGroup( GroupId: number, username: string, members: string[], GroupAdmin: string, NonAdminMode ?: boolean) {
    let endpoint = 'http://127.0.0.1:5000/group/addUsersGroup';
    if (NonAdminMode === true) {
      endpoint = 'http://127.0.0.1:5000/group/addUsersGroupNonAdmin';
    }
    console.log('MODE CHECK: ', endpoint);
    const queryPayload = {user_name: username, group_id: GroupId.toString(), users: members, group_admin: GroupAdmin};
    console.log('ADD USERS : ', queryPayload);
    return this.http.post<Status>(endpoint, queryPayload);
  }
}
