import { Component, computed, inject } from '@angular/core';
import {Observable, Observer, Subscription, catchError, concatMap, of, tap} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import { DriveService } from '../../services/drive.service';
import { IBoundaryDatesResponse } from '../../Models/boundary-dates';
import { Entry, INavigateByPathResponse } from '../../Models/navegate-by-path';

export interface ExampleTab {
  label: string;
  content: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatTabsModule, DatePipe, MatTableModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  driveService = inject(DriveService);
  errorMessage = '';
  private subscriptions = new Subscription();
  navigationTokens = new Map<string, string>(); // Cambiado a Map para un manejo más eficiente
  displayedColumns45: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns2: string[] = ['mftId','length', 'name', 'createdDate', 'modifiedDate','lastAccessedDate','isDirectory', 'isHidden', 'isSystem'];

  dataSource2 = new MatTableDataSource<Entry>();
  dataSource = ELEMENT_DATA;
  cadena="hola";

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Limpieza de suscripciones
  }
  // Component signals
  computers = computed(() => {
    try {
      return this.driveService.computers();
    } catch (e) {
      this.errorMessage = typeof e === 'string'? e : 'Error';
      return [];
    }
  });
  selectedComputer = this.driveService.selectedComputer;

  tabLoadTimes: Date[] = [];
  boundaryDates: IBoundaryDatesResponse[] = [];

  getTimeLoaded(computerId: number) {
    if (!this.tabLoadTimes[computerId]) {
      console.log('computerId',computerId);
    this.cadena=this.cadena.concat("Mundo");
      this.tabLoadTimes[computerId] = new Date();
      this.driveService.getBoundaryDates(computerId).subscribe({
        next: (data) => {
          console.log('getBoundaryDates',data);
        }
      });
      this.driveService.getSnapshots(computerId, new Date()).subscribe({
        next: (data) => {
          console.log('getSnapshots',data);
          this.driveService.navigateByPath(
            data.processedDrivePartitions[0].driveId,
            new Date("2024-02-23T12:51:59.999Z"),
            data.processedDrivePartitions[0].letter).subscribe({
              next: (response: INavigateByPathResponse) => {
                console.log(response);
               console.log('navByPathResIds', response.ids);
               console.log('navByPathResEntries', response.entries);
               console.log('ELEMENT_DATA',ELEMENT_DATA);
               this.dataSource2.data = response.entries;

              }
            })
        }
      })
    }

    return this.tabLoadTimes[computerId];
  }
  //TODO: arregla este método
  getBoudaryDates(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
  // onSelected(computerId: number): void {
  //   console.log('llamada a onselected', 'computerId', computerId);
  //   this.driveService.computerSelected(computerId);
  // }
  getNavigationToken(driveId: number, path: string) {
    const key = path.substring(0, 2).toLowerCase();
    const token = this.navigationTokens.get(driveId + "-" + key);
    return token;
  }

  setNavigationToken(driveId: number, path: string, token: string)  {
    const key = path.substring(0, 2).toLowerCase();
    this.navigationTokens.set(`${driveId}-${key}`, token);
  }

  constructor() {  }

}
