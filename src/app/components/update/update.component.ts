import {
  AfterViewInit,
  Component,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Observable,
  Observer,
  Subscription,
  catchError,
  concatMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { DriveService } from '../../services/drive.service';
import { IBoundaryDatesResponse } from '../../Models/boundary-dates';
import { Entry, INavigateByPathResponse } from '../../Models/navegate-by-path';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTabsModule,
    MatSlideToggleModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent implements AfterViewInit {
  driveService = inject(DriveService);
  errorMessage = '';
  private subscriptions = new Subscription();
  navigationTokens = new Map<string, string>(); // Cambiado a Map para un manejo más eficiente
  displayedColumns: string[] = [
    'mftId',
    'length',
    'name',
    'createdDate',
    'modifiedDate',
    'lastAccessedDate',
    'isDirectory',
    'isHidden',
    'isSystem',
  ];
  dataSource: Entry[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  // dataSource2:Entry[] = [
  //   {
  //     "mftId": 52,
  //     "length": 33177718,
  //     "name": "dotnet-runtime-x64 - copia.zip",
  //     "createdDate": "2024-02-20T15:31:22.3613601Z",
  //     "modifiedDate": "2024-01-06T21:41:22.5085159Z",
  //     "lastAccessedDate": "2024-02-20T15:31:22.4277824Z",
  //     "isDirectory": false,
  //     "isHidden": false,
  //     "isSystem": false
  // }
  // ];
  cadena = 'hola';

  selectedTabIndex = signal(0);
  prefetchTabs = signal(false);

  ngOnDestroy() {}
  // Component signals
  computers = computed(() => {
    try {
      return this.driveService.computers();
    } catch (e) {
      this.errorMessage = typeof e === 'string' ? e : 'Error';
      return [];
    }
  });

  tabLoadTimes: Date[] = [];
  dataCahched: any = {};

  constructor() {
    // this.dataSource = new MatTableDataSource(this.entries);
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginato = this.paginator as MatPaginator;
    // this.dataSource.sort = this.sort as MatSort;
  }

  getComputerDetails(tabIndex: number) {
    const computerId = this.computers()[tabIndex].computerId;
    if (this.dataCahched[computerId]) {
      this.dataSource = this.dataCahched[computerId];
      return;
    }

    this.driveService
      .getBoundaryDates(computerId)
      .pipe(
        switchMap((boundaryDates) => {
          return this.driveService
            .getSnapshots(computerId, boundaryDates[0].maxDate)
            .pipe(
              switchMap((snapshots) => {
                return this.driveService.navigateByPath(
                  snapshots.processedDrivePartitions[0].driveId,
                  boundaryDates[0].maxDate,
                  snapshots.processedDrivePartitions[0].letter
                );
              })
            );
        })
      )
      .subscribe({
        next: (response: INavigateByPathResponse) => {
          this.dataSource = response.entries;
          this.dataCahched[computerId] = this.dataSource;
        },
        error: (error) => {
          this.dataSource = [];
          this.dataCahched[computerId] = this.dataSource;
        },
      });
  }
  getNavigationToken(driveId: number, path: string) {
    const key = path.substring(0, 2).toLowerCase();
    const token = this.navigationTokens.get(driveId + '-' + key);
    return token;
  }

  setNavigationToken(driveId: number, path: string, token: string) {
    const key = path.substring(0, 2).toLowerCase();
    this.navigationTokens.set(`${driveId}-${key}`, token);
  }
}
