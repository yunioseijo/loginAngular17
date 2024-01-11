import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { GlobalService } from '../services/global.service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('llama al intercpetor');
  let clonedRequest = req;
  const storageservice = inject(StorageService);
  const globalservice = inject(GlobalService);
  
  if (storageservice.isLoggedIn()) {

    clonedRequest = req.clone({
      setHeaders: {
        authorization: localStorage.getItem("AccessToken")!,
        refresh: localStorage.getItem("RefreshToken")!,
    }

    });
  }
  return next(clonedRequest);
};

// export const interceptErrorLogin: Observable<HttpEvent<any>> = (request: HttpRequest<any>, next: HttpHandler) => {
//   return next.handle(request).pipe(
//     catchError((error: HttpErrorResponse) => {
//       if (error.status === 401) {
//         this.router.navigate(['/login']);
//       }
//       return Observable.throw(error);
//     }),
//   );
// }
