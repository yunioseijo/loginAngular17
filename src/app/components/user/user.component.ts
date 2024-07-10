import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFiltersComponent } from '../user-filters/user-filters.component';
import { ReactiveFormExampleComponent } from '../reactive-form-example/reactive-form-example.component';
import { ButtonComponent } from '../forms-components/button/button.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipe, UserFiltersComponent,ReactiveFormExampleComponent,ButtonComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent {
// filtrosAplicados($event: any) {
// console.log("Este valor del filtro es en el padre:", $event);
// this.queryParams = $event;
// console.log(this.queryParams);
// this.getUsers(this.queryParams);
// }

  userFilter:any={name:''};

  private _router = inject(ActivatedRoute);
  // queryParams: IUserListFilterRequest2 = {
  //   "Filter": {
  //     ConnectionStatus: '',
  //     PartnerStatus: '',
  //   },
  //   "Order": {
  //       "IsAscending": false,
  //       "FieldName": "CreatedDate"
  //   },
  //   "Paging": {
  //       "Page": 1,
  //       "PageSize": 50
  //   }
  // }

  ngOnInit(): void {
      // this.getUsers(this.queryParams);


  }

  // private getUsers(params: IUserListFilterRequest2): void {
  //   this._userService.getUserList(params).subscribe({
  //     next: (res) => this.onGetUsersSuccess(res),
  //     error: (err) => this.onGetUsersError(err)
  //   });
  // }

  // private onGetUsersSuccess(res: any): void {
  //   console.log('Respuesta de getUsers:', res);
  //   this.userListResponse = res;
  //   console.log(res.itemss);
  //   this.userInfoResponse = res.items; // Ajusta esto según la estructura de tu respuesta
  // }

  private onGetUsersError(err: any): void {
    console.error(err);
  }

  onButtonClickDelOutput(event: Event): void {
    console.log('Botón presionado', event);
  }



}
