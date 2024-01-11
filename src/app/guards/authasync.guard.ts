import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const authservice = inject(AuthService);
    const storageService = inject(StorageService);
    const userService = inject(UserService);
    const router = inject(Router);
    const isLoggedIn = storageService.isLoggedIn();

    if (!isLoggedIn) {
        // Si no está logueado, redirige a la página de login
        router.navigateByUrl('/login');
        return false;
    }
    return false
    // try {
    //    return userService.getCurrentUser().pipe(
    //         map(data => {
    //           const profile = data.Profiles;
    //           console.log('Profile en el getCurrentUser del guard', data.Profiles);
    //           console.log(data);
      
    //     if (!profile) {
    //       // Si el usuario no tiene el perfil adecuado, redirige a la página de login
    //       router.navigateByUrl('/login');
    //       return false;
    //     }
    //     router.navigateByUrl('/home');
    //     return true;
    // })
    //    )
    // }
    // catch (error) {
    //     // Manejar errores aquí, por ejemplo, redirigir a la página de login
    //     console.error(error);
    //     router.navigateByUrl('/login');
    //     return false;
    //   }
    

    
        
   
  }
}
