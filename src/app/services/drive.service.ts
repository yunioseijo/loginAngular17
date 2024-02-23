import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  catchError,
  filter,
  forkJoin,
  map,
  Observable,
  shareReplay,
  switchMap,
  throwError
} from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { IUserComputerResponse } from '../Models/usercomputers';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  http = inject(HttpClient);
  globalService = inject(GlobalService);

  constructor() { }

  private computers$ = this.http.post<IUserComputerResponse[]>(
    `${this.globalService.PORTAL_API_URL()}/Portal/Drive/GetUserComputers`,{});

  // Expose signals from this service
  computers = toSignal(this.computers$, {initialValue: [] as IUserComputerResponse[]});
  selectedComputer = signal<IUserComputerResponse | undefined>(undefined);

  computerSelected(computerId: number) {
    const foundComputer = this.computers().find((comp) => comp.computerId === computerId);
    this.selectedComputer.set(foundComputer);
  }
}
