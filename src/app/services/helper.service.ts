import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
    localStorage.clear();
  }

  isEmailValid(email: string | null | undefined): boolean {
    if (email === null || email === undefined || email.length < 6) {
      return false;
    }
  
    const emailPattern: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/i;
    return emailPattern.test(email);
  }

}
