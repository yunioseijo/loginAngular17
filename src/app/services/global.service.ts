import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private portal_api_url: string = 'http://localhost';
  private portal_api_port: string = '10006';
  private admin_api_url: string = 'https://yvl-webadmin.azurewebsites.net/api/';
  private admin_api_port: string = '443';


  public PORTAL_API_URL(): string {
    if (this.portal_api_url) {
      return this.portal_api_url + ":" + this.portal_api_port;
    }
    return location.protocol + '//' + location.hostname + ":" + this.portal_api_port;
  }
  public ADMIN_API_URL(): string {
    if (this.admin_api_url) {
      return this.admin_api_url;
    }
    return location.protocol + '//' + location.hostname + ":" + this.admin_api_port;
  }

  public httpOptions(): any{
    return new HttpHeaders({ 'Content-Type': 'application/json' });

  }




  constructor() { }




}
