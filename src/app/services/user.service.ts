import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { StorageService } from './storage.service';
import { IAuthenticatedUserResponse, IUserResponse } from '../Models/user.model';
import { IUserListFilterRequest, IUserListResponse, UserListFilterRequest } from '../Models/userList.model';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public global = inject(GlobalService);
  public storageService = inject(StorageService);
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<IAuthenticatedUserResponse> {
    // return this.http.post(this.global.PORTAL_API_URL() + '/Auth/CurrentUser',{}, this.storageService.AUTH_CONFIG());
    console.log('LLamada al current User');
    return this.http.post<IAuthenticatedUserResponse>(this.global.PORTAL_API_URL() + '/Auth/CurrentUser',{} );
  }

  checkProfile(profile: number): Observable<any> {
    return this.http.post(this.global.PORTAL_API_URL() + '/Auth/CheckRole',{ params: { profiles: profile } });
  }
  hasProfile(profile: number, perfilObjetivo: number): boolean{
    return (profile & perfilObjetivo) != 0;
  }

  getUserList2(params: IUserListFilterRequest): Observable<IUserListResponse> {
    return this.http.post<IUserListResponse>(this.global.ADMIN_API_URL() + 'user/list', params);
  }
  getUserList(params: UserListFilterRequest): Observable<IUserListResponse> {
    return this.http.post<IUserListResponse>('http://localhost:61180/User/GetUsers', params);
  }


}
