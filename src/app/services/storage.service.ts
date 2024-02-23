import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    console.log('Borro los datos de localsotarage y session');
    window.localStorage.clear();
    localStorage.removeItem('accessToken');
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    this.clean();
    localStorage.setItem("accessToken", "Bearer " + user.accessToken);
    localStorage.setItem("refreshToken", "Bearer " + user.refreshToken);
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private   auth_config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
      refresh: localStorage.getItem("refreshToken"),
  }
}
  public AUTH_CONFIG(): any {
    return this.auth_config
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
