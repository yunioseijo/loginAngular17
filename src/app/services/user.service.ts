import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public global = inject(GlobalService);
  public storageService = inject(StorageService);
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.post(this.global.PORTAL_API_URL() + '/Auth/CurrentUser',{}, this.storageService.AUTH_CONFIG());
  }

  checkProfile(profile: string): Observable<any> {    
    return this.http.post(this.global.PORTAL_API_URL() + '/Auth/CheckRole',{ params: { profiles: profile } }, this.storageService.AUTH_CONFIG());
  }
  hasProfile(profile: number, perfilObjetivo: number): boolean{
    return (profile & perfilObjetivo) != 0;
  }

 
}
