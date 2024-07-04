import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
// import { AuthService } from '../services/auth.service';
import { AuthService } from '../ClientApi/api/auth.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { Observable, catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { IUserResponse } from '../Models/user.model';
import { HttpResponse } from '@angular/common/http';

export const authGuard2: CanActivateFn = (route, state) => {
  //injectando el servicio dentro de la función
  const authservice = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);
  return true;
  // if (authservice.isLoggedIn()) {
  //   return true;
  // } else {
  //   const url = router.createUrlTree(['/login']);
  //   return url;
  // }
};
// export const authGuard: CanActivateFn = () => {
//   const storageService = inject(StorageService);
//   const userService = inject(UserService);
//   const router = inject(Router);

//   let user: UserDto;

//   let isLoggedIn = storageService.isLoggedIn();
//   console.log('Guard, Esta logueado?', isLoggedIn);
//   if (isLoggedIn) {

//     userService.getCurrentUser().subscribe((res: any) => {
//       user = res;
//       userService.checkProfile(user.Profiles).subscribe(  (response: HttpResponse<any>) => {
//         // Obtener el código de estado
//         if(!response)
//           console.log('Código de estado errado');

//         console.log('Código de estado:',response);
//         return false;
//       },

//     error => {
//       console.log('Código de estado errado');
//     }

//       );
//       console.log(user.Profiles);
//       });
//   }
//   else{
//     router.navigate(['/login']);
//     return false;
//   }
//     // Si no está logueado, redirige a la página de login
//     const url = router.createUrlTree(['/login']);
//     return url;

// };

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const userService = inject(UserService);
  const router = inject(Router);

  if (!storageService.isLoggedIn()) {
    console.log('no ha hecho login')
    const url = router.createUrlTree(['/login']);
    return url
  }
  return authService.authCheckRolePost(({ Profiles: []})).pipe(
    map((response) => {
      // Aquí puedes manejar la lógica en base al estado de la respuesta
      return true; // O false, dependiendo de tu lógica específica
    }),
    catchError((error) => {
      console.log('Error:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
  // return userService.getCurrentUser().pipe(
  //   switchMap((user) => userService.checkProfile(user.profile)),
  //   map((response) => {
  //     // Aquí puedes manejar la lógica en base al estado de la respuesta
  //     return true; // O false, dependiendo de tu lógica específica
  //   }),
  //   catchError((error) => {
  //     console.log('Error:', error);
  //     router.navigate(['/login']);
  //     return of(false);
  //   })
  // );
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
