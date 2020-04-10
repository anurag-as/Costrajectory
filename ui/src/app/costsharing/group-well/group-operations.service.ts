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

  deleteUsersFromGroup( GroupId: number, username: string, members: string[]) {
    const endpoint = 'http://127.0.0.1:5000/removeUsersGroup';
    const queryPayload = {user_name: username, group_id: GroupId.toString(), users: members};
    return this.http.post<Status>(endpoint, queryPayload);
  }

  deleteGroup( GroupId: number, username: string) {
    const endpoint = 'http://127.0.0.1:5000/deleteGroup';
    const queryPayload = {user_name: username, group_id: GroupId.toString()};
    return this.http.post<Status>(endpoint, queryPayload);
  }

  ExitFromGroup( GroupId: number, username: string, nextAdmin?: string) {
    const endpoint = 'http://127.0.0.1:5000/deleteGroup';
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
    const endpoint = 'http://127.0.0.1:5000/changeGroupAdmin';
    const queryPayload = {user_name: username, group_id: GroupId.toString(), group_admin: nextAdmin};
    return this.http.post<Status>(endpoint, queryPayload);
  }

  AddUsersToGroup( GroupId: number, username: string, members: string[]) {
    const endpoint = 'http://127.0.0.1:5000/addUsersGroup';
    const queryPayload = {user_name: username, group_id: GroupId.toString(), users: members};
    return this.http.post<Status>(endpoint, queryPayload);
  }
}
