import { Component, computed, inject } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import {AsyncPipe} from '@angular/common';
import { DriveService } from '../../services/drive.service';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [MatTabsModule, AsyncPipe],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  driveService = inject(DriveService);
  asyncTabs: Observable<ExampleTab[]>;
  errorMessage = '';

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

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]);
      }, 1000);
    });
  }

}
