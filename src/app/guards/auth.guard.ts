import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  //injectando el servicio dentro de la función
  const authservice = inject(AuthService);
  const router = inject(Router);
  if (authservice.isLoggedIn()){
    return true;
  }
  else{
    const url = router.createUrlTree(['/login']);
    return url;
  }
};

export const authGuardMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  //injectando el servicio dentro de la función
  const authservice = inject(AuthService);
  return authservice.isLoggedIn();
  
};
