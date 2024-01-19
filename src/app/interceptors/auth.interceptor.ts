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

  // Lista de URLs para las que no se debe agregar la autenticación
  const excludedUrls = [
    'https://api.ejemplo.com/publico',
    'https://otroapi.ejemplo.com/sin-autenticacion',
    // Puedes agregar más URLs aquí
    'https://yvl-webadmin.azurewebsites.net/api/user/l',
    'http://localhost:3000/'
  ];

  // Verifica si la URL actual está en la lista de excluidos
  const isExcludedUrl = excludedUrls.some(url => req.url.startsWith(url));
  console.log('isExcludedUrl',isExcludedUrl);
  
  if (storageservice.isLoggedIn() && !isExcludedUrl ) {

    clonedRequest = req.clone({
      setHeaders: {
        authorization: localStorage.getItem("AccessToken")!,
        refresh: localStorage.getItem("RefreshToken")!,
    }

    });
  }
  return next(clonedRequest);
};


