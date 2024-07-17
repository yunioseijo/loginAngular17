import { Component, inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { FilteredUsers, GetUsersRequest, UserService } from '../../../PruebasApi';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';

import { Table } from 'primeng/table';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface FilteredUsersWithDate extends Omit<FilteredUsers, 'createdDate'> {
  createdDate: Date | null;
}
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [PrimeNgModule, DatePipe, InputTextModule,FormsModule, ReactiveFormsModule ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [MessageService]
})
export class UserListComponent implements OnInit {
  //Dependency Injection
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  public filterForm: FormGroup = this.fb.group({
    freeText: [''],
    hasDrivesUploading: [false],
    hasDrivesProcessingUpload: [false],
    hasDrivesBrowsable: [false],
    connectionStatus: [0],
  });
  //Properties
  users: FilteredUsersWithDate[] = [];
  selectedUser!: FilteredUsersWithDate;
  usersRequest:GetUsersRequest = {
    filter: {},
    order: {fieldName: "CreatedDate",isAscending: false},
    paging: {pageSize: 50, page: 1}
  };



  ngOnInit(): void {
    this.userService.userGetUsersPost(this.usersRequest)
    .subscribe(res => {
      if (res && res.items) {
        this.users = res.items.map(user => ({
          ...user,
          createdDate: user.createdDate ? new Date(user.createdDate) : null  // Convertimos la cadena de fecha a objeto Date
        }));
      }
    })
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
