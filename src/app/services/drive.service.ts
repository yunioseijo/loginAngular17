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

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  http = inject(HttpClient);

  constructor() { }

  private computers$ = this.http.post<IUserComputerResponse[]>(
    `http://devportalapi.g-backupinfinite.gigas.com/Portal/Drive/GetUserComputers`,{});

  // Expose signals from this service
  computers = toSignal(this.computers$, {initialValue: [] as IUserComputerResponse[]});
  selectedComputer = signal<IUserComputerResponse | undefined>(undefined);

  computerSelected(computerId: number) {
    const foundComputer = this.computers().find((comp) => comp.computerId === computerId);
    this.selectedComputer.set(foundComputer);
  }
}
