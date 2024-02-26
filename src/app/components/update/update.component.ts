import { Component, computed, inject } from '@angular/core';
import {Observable, Observer, Subscription, catchError, concatMap, of, tap} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {DatePipe} from '@angular/common';
import { DriveService } from '../../services/drive.service';
import { IBoundaryDatesResponse } from '../../Models/boundary-dates';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatTabsModule, DatePipe],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  driveService = inject(DriveService);
  errorMessage = '';
  private subscriptions = new Subscription();
  navigationTokens = new Map<string, string>(); // Cambiado a Map para un manejo más eficiente

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
      this.tabLoadTimes[computerId] = new Date();
      this.driveService.getBoundaryDates(computerId).subscribe({
        next: (data) => {
          console.log(data);
        }
      });
      this.driveService.getSnapshots(computerId, new Date()).subscribe({
        next: (data) => {
          console.log(data);
          this.driveService.navigateByPath(
            data.processedDrivePartitions[0].driveId,
            new Date("2024-02-23T12:51:59.999Z"),
            data.processedDrivePartitions[0].letter).subscribe({
              next: (navigateByPathResponse) => {
                console.log(navigateByPathResponse);
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
