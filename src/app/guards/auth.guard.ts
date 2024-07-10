import { CheckRoleRequest } from './../PruebasApi/model/checkRoleRequest';
import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { AuthService } from '../PruebasApi/api/auth.service';
import { StorageService } from '../services/storage.service';
import {  catchError, map, of, switchMap } from 'rxjs';

export const authGuard2: CanActivateFn = (route, state) => {
  //injectando el servicio dentro de la función
  const authservice = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);
  return true;
  }

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  return authService.authCurrentUserPost().pipe(
    map((response) => {
      return true;
    }),
    catchError((error) => {
      console.log('Error:', error);
      router.navigate(['/auth']);
      return of(false);
    })
  );

};

export const authGuardMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  //injectando el servicio dentro de la función
  const authservice = inject(AuthService);
  // return authservice.isLoggedIn();
  return true;
};
