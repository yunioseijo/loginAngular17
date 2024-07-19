import { Component, inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { ConnectionStatus, FilteredUsers, GetUsersRequest, UserService } from '../../../PruebasApi';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';

import { Table } from 'primeng/table';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

interface FilteredUsersWithDate extends Omit<FilteredUsers, 'createdDate'> {
  createdDate: Date | null;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [PrimeNgModule, DatePipe, InputTextModule,FormsModule, ReactiveFormsModule,PaginatorModule ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [MessageService]
})
export class UserListComponent implements OnInit {
  //Dependency Injection
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  maxDate: Date | undefined;
  filterForm: FormGroup;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  //Properties
  users: FilteredUsersWithDate[] = [];
  selectedUser!: FilteredUsersWithDate;
  usersRequest:GetUsersRequest = {
    filter: {},
    order: {fieldName: "CreatedDate",isAscending: false},
    paging: { pageSize: this.rows, page: 1 },
  };
  connectionStatusOptions;

  constructor() {
    this.filterForm = this.fb.group({
      freeText: [''],
      hasDrivesUploading: [false],
      hasDrivesProcessingUpload: [false],
      hasDrivesBrowsable: [false],
      connectionStatus: [ConnectionStatus.ALL],
      showDeleted: [false],
    });
    this.connectionStatusOptions = Object.keys(ConnectionStatus).map(key => ({
      label: key,
      value: ConnectionStatus[key as keyof typeof ConnectionStatus]
    }));
  }



  ngOnInit(): void {
    this.loadUsers();
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first ? event.first : 0;
    this.rows = event.rows ? event.rows : 10;
    console.log('llama el server, event: ', event);
    this.usersRequest.paging = {
      pageSize: this.rows,
      page: this.first / this.rows + 1,
    };
    this.loadUsers();
  }
  loadUsers() {
    this.userService.userGetUsersPost(this.usersRequest)
    .subscribe(res => {
      if (res && res.items) {
        this.users = res.items.map(user => ({
          ...user,
          createdDate: user.createdDate ? new Date(user.createdDate) : null  // Convertimos la cadena de fecha a objeto Date
        }));
        this.totalRecords = res.totalItemCount
            ? res.totalItemCount
            : 0;
      }
    });
  }

  onSave(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }
    const { freeText, hasDrivesUploading, hasDrivesProcessingUpload,hasDrivesBrowsable, connectionStatus, showDeleted } = this.filterForm.value;
    this.usersRequest.filter = {
      ...this.usersRequest.filter,
      freeText: freeText ? freeText : null,
      hasDrivesUploading: hasDrivesUploading ? hasDrivesUploading : null,
      hasDrivesProcessingUpload: hasDrivesProcessingUpload ? hasDrivesProcessingUpload : null,
      hasDrivesBrowsable: hasDrivesBrowsable ? hasDrivesBrowsable : null,
      connectionStatus: connectionStatus ? connectionStatus : null,
      showDeleted: showDeleted,
    };
    this.loadUsers();
  }
  onRowSelect(event: any) {
    console.log(`on row select ${event.data.name}`);
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
}

onRowUnselect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
}

onEdit(event: any) {
  if (!this.isPositiveInteger(event.target.value)) {
      event.stopPropagation();
  }
}

isPositiveInteger(val: any) {
  let str = String(val);
  str = str.trim();
  if (!str) {
      return false;
  }
  str = str.replace(/^0+/, '') || '0';
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}

}
