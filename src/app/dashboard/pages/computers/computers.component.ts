import { CommonModule, DatePipe } from '@angular/common';
import { PrimeNgModule } from './../../../prime-ng/prime-ng.module';
import { Component, inject, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ComputerService, FilteredComputer, FilteredUsers, GetPartnerComputersRequest, GetPartnerComputersResponse, } from '../../../PruebasApi';
import { BytePipe } from '../../../Pipes/byte.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SortDirective } from '../../directives/sort.directive';
import { ProgressBarModule } from 'primeng/progressbar';
import { Router } from '@angular/router';

interface FilteredComputerWithDate
  extends Omit<FilteredComputer, 'subscriptionExpirationDate'> {
  subscriptionExpirationDate: Date | null;
}

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [
    PrimeNgModule,
    DatePipe,
    BytePipe,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    SortDirective,
    CommonModule,
    ProgressBarModule
  ],
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css',
})
export class ComputersComponent implements OnInit {

  computers: FilteredComputerWithDate[] = [];
  private computerService = inject(ComputerService);
  private fb = inject(FormBuilder);
  router: Router = inject(Router);

  loading: boolean = true;
  maxDate: Date | undefined;
  formFilters: FormGroup;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  // selectedUser!: FilteredUsers;

  getPartnerComputersRequest: GetPartnerComputersRequest = {
    filter: {
      from: null,
      maxSubscriptionExpirationDate: null,
      minSubscriptionExpirationDate: null,
      showDeleted: false,
      showExpired: true,
      showNotExpired: true,
      status: [],
    },
    order: { fieldName: 'Email', isAscending: true },
    paging: { pageSize: this.rows, page: 1 },
  };
  rowsPerPageOptions = [10, 25, 50, 100];
  private subscriptions: Subscription[] = [];

  constructor() {
    this.formFilters = this.fb.group({
      text: [''],
      expired: [true],
      active: [true],
      expFrom: [''],
      expTo: [''],
    });
  }
  ngOnInit(): void {
    this.maxDate = new Date();
    this.loadComputers();
    console.log('on it computers');
  }
  onRowSelect(event: any) {
    console.log(`on row select ${JSON.stringify(event)}`);
    redirectTo: `users/${event.data.userId}`;
  }
  onRowSelectClick(computer: FilteredComputerWithDate) {
    console.log(`onRowSlectClick: ${JSON.stringify(computer)}`);
    this.router.navigate(['dashboard/users', computer.userId]);

    }

  onSortChange($event: { field: string; order: number }) {
    // console.log(`onSortChange: ${$event.field} ${$event.order}`);
    this.getPartnerComputersRequest.order = {
      ...this.getPartnerComputersRequest.order,
      fieldName: $event.field,
      isAscending: $event.order === 1,
    };
    this.loadComputers();
  }

  toCapitalCase(word: string) {
    if (!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  onSave(): void {
    if (this.formFilters.invalid) {
      this.formFilters.markAllAsTouched();
      return;
    }
    const { text, expired, active, expFrom, expTo } = this.formFilters.value;
    this.getPartnerComputersRequest.filter = {
      ...this.getPartnerComputersRequest.filter,
      freeText: text ? text : null,
      minSubscriptionExpirationDate: expFrom ? expFrom : null,
      showExpired: expired,
      showNotExpired: active,
      maxSubscriptionExpirationDate: expTo ? expTo : null,
    };
    this.loadComputers();
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first ? event.first : 0;
    this.rows = event.rows ? event.rows : 10;
    console.log('llama el server, event: ', event);
    this.getPartnerComputersRequest.paging = {
      pageSize: this.rows,
      page: this.first / this.rows + 1,
    };
    this.loadComputers();
  }

  private loadComputers() {
    this.loading = true;
    this.computerService
      .computerGetComputersPost(this.getPartnerComputersRequest)
      .subscribe((response) => {
        if (response && response.items) {
          console.log(response.items);
          this.computers = response.items.map((computer) => ({
            ...computer,
            subscriptionExpirationDate: computer.subscriptionExpirationDate
              ? new Date(computer.subscriptionExpirationDate)
              : null, // Convertimos la cadena de fecha a objeto Date
          }));
          this.totalRecords = response.totalItemCount
            ? response.totalItemCount
            : 0;
          this.loading = false;
        }
      });
  }
}
