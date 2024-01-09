import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandingService {
  public global = inject(GlobalService)


  constructor(private http: HttpClient) { }

  getBrandingInformation(): Observable<any> {
    return this.http.post(this.global.PORTAL_API_URL() + '/Branding/GetBrandingInformation',{});
  }
}
