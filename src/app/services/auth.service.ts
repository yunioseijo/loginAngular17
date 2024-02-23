import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { ILogin } from '../Models/login.model';
import { IAuthenticatedUserResponse } from '../Models/user.model';

// const AUTH_API = 'http://infinitebackup.gigas.com:9080/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public global = inject(GlobalService);
  private _http = inject(HttpClient);

  constructor() {}

/**
 * The login function sends a POST request to the server with the provided username, password, and
 * partnerId to authenticate the user.
 * @param {string} username - The username is a string that represents the email of the user trying to
 * log in.
 * @param {string} password - The password parameter is a string that represents the user's password.
 * @param {number} partenrId - The `partenrId` parameter is a number that represents the ID of the
 * partner. It is used in the login process to identify the partner associated with the user.
 * @returns The login function is returning an Observable of type 'any'.
 */
  login(username: string, password: string, partenrId:number): Observable<any> {
    return this._http.post(
      `${this.global.PORTAL_API_URL()}/Auth/SignIn`,
      {
          Email: username,
          Password: password,
          PartnerId: partenrId
      },
      this.global.httpOptions()
    );
  }


    logout(): Observable<any> {
      //TODO: esto no funciona porque no existe ese endpoint
    return this._http.get('/api/auth/logout');
  }


  public isLoggedIn(): boolean {
    let accesToken = localStorage.getItem("accessToken");
    // const user = window.sessionStorage.getItem(USER_KEY);
    if (accesToken) {
      return true;
    }
    return false;
  }

}
