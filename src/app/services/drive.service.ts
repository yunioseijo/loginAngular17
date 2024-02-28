import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  catchError,
  concatMap,
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
import { IBoundaryDatesResponse } from '../Models/boundary-dates';
import { ISnapshotResponse } from '../Models/snapshots';
import { INavigateByPathResponse } from '../Models/navegate-by-path';

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
  getBoundaryDates(computerId: number) {
    return this.http.post<IBoundaryDatesResponse[]>
    (this.globalService.PORTAL_API_URL() + '/Portal/Drive/BoundaryDates', { computerId:  computerId.toString()});
  }
  getSnapshots(computerId: number, date: Date){
    return this.http.post<ISnapshotResponse>
    (this.globalService.PORTAL_API_URL() + '/Portal/Drive/GetSnapshot', { computerId:  computerId.toString(), date: date.toISOString()});
  }

  navigateByPath(driveId: number, requestDate: Date, fullPath: string, ) : Observable<INavigateByPathResponse> {
    const bodyRequest= {
      driveId: driveId,
      fullPath: fullPath,
      // requestDate: "2024-02-23T12:51:59.999Z",
      requestedDate: requestDate.toISOString(),

    }
    return this.http.post<INavigateByPathResponse>(this.globalService.PORTAL_API_URL() + '/Portal/Drive/NavigateByPath', bodyRequest);

  }
  getFinalData(computerId: number): Observable<any> {
    return this.getBoundaryDates(computerId).pipe(
      concatMap(boundaryData =>
        this.getSnapshots(computerId, new Date("2024-02-23T12:51:59.999Z")).pipe(
          concatMap(snapshotData =>
            this.navigateByPath(snapshotData.processedDrivePartitions[0].driveId, new Date("2024-02-23T12:51:59.999Z"), snapshotData.processedDrivePartitions[0].letter)
          )
        )
      )
    );
  }


}
