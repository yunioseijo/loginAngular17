import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const storageService = inject(StorageService);
    const router = inject(Router);
    const isLoggedIn = storageService.isLoggedIn();

    if (!isLoggedIn) {
        // Si no está logueado, redirige a la página de login
        router.navigateByUrl('/login');
        return false;
    }
    return false



  }
}
