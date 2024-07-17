import { DatePipe } from '@angular/common';
import { PrimeNgModule } from './../../../prime-ng/prime-ng.module';
import { Component, inject, OnInit } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ComputerService, FilteredComputer,GetPartnerComputersRequest, GetPartnerComputersResponse } from '../../../PruebasApi';
import { BytePipe } from '../../../Pipes/byte.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableLazyLoadEvent } from 'primeng/table';
import { Subscription } from 'rxjs';

interface FilteredComputerWithDate extends Omit<FilteredComputer, 'subscriptionExpirationDate'> {
  subscriptionExpirationDate: Date | null;
}
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [PrimeNgModule, DatePipe, BytePipe, PaginatorModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './computers.component.html',
  styleUrl: './computers.component.css'
})
export class ComputersComponent implements OnInit {
  computers: FilteredComputerWithDate[] = [];
  private computerService = inject(ComputerService);
  private fb = inject(FormBuilder);

  maxDate: Date | undefined;
  formFilters: FormGroup;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0 ;

  getPartnerComputersRequest: GetPartnerComputersRequest = {
    filter: { from: null,
      maxSubscriptionExpirationDate: null,
      minSubscriptionExpirationDate: null,
      showDeleted: false,
      showExpired: true,
      showNotExpired: true,
      status: [],

    },
    order: { fieldName: "Email", isAscending: false },
    paging: {pageSize: this.rows, page: 1 }
  }
  rowsPerPageOptions = [10, 25, 50, 100];
  private subscriptions: Subscription[] = [];

  constructor() {
    this.formFilters = this.fb.group({
      text: [''],
      expired: [true],
      active: [true],
      expFrom: [''],
      expTo: ['']
    });
  }



  onSave(): void {
    if ( this.formFilters.invalid ) {
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
      maxSubscriptionExpirationDate: expTo ? expTo : null
    };
    this.laodComputers();

  }
  onPageChange(event: PaginatorState) {
      this.first = event.first ? event.first : 0;
      this.rows = event.rows ? event.rows : 10;
      console.log('llama el server, event: ', event);
      this.getPartnerComputersRequest.paging = {pageSize: this.rows, page: this.first / this.rows+1};
      this.laodComputers();
  }
  ngOnInit(): void {
    this.maxDate = new Date();
    this.laodComputers();

  }
  private laodComputers(){
    this.computerService.computerGetComputersPost(this.getPartnerComputersRequest).subscribe(response => {
      if (response && response.items) {
        console.log(response.items);
        this.computers = response.items.map(computer => ({
          ...computer,
          subscriptionExpirationDate: computer.subscriptionExpirationDate ? new Date(computer.subscriptionExpirationDate) : null  // Convertimos la cadena de fecha a objeto Date
        }));
        this.totalRecords= response.totalItemCount ? response.totalItemCount : 0;

      }
    });
  }

}
