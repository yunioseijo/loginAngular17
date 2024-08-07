import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Parteners = {
  [key: string]: number;
};
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private portal_api_url: string = 'http://localhost';
  private portal_api_port: string = '10009';
  // private portal_api_url: string = 'https://devportalapi.g-backupinfinite.gigas.com';
  // private portal_api_port: string = '443';
  private admin_api_url: string = 'http://localhost';
  private admin_api_port: string = '10009';


  private _partners: Parteners = {
    'gbackupinfinite': 1,
    'resqtime': 2,
  } ;

  getPartnerValue(hostname: string):number{
    const key = Object.keys(this._partners).find(k => hostname.includes(k));
    return key ? this._partners[key] : 1;
  }



  public PORTAL_API_URL(): string {
    if (this.portal_api_url) {
      return this.portal_api_url + ":" + this.portal_api_port;
    }
    return location.protocol + '//' + location.hostname + ":" + this.portal_api_port;
  }
  public ADMIN_API_URL(): string {
    if (this.admin_api_url) {
      return this.admin_api_url + ":" + this.admin_api_port;
    }
    return location.protocol + '//' + location.hostname + ":" + this.admin_api_port;
  }

  public httpOptions(): any{
    return new HttpHeaders({ 'Content-Type': 'application/json' });

  }




  constructor() { }




}
