import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserInfoResponse, IUserListResponse, UserListFilterRequest } from '../../Models/userList.model';
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
filtrosAplicados($event: any) {
console.log("Este valor del filtro es en el padre:", $event);
this.queryParams = $event;
console.log(this.queryParams);
this.getUsers(this.queryParams);
}
  userInfoResponse: IUserInfoResponse[]=[];
  userListResponse: IUserListResponse | undefined;
  userFilter:any={name:''};
  
  private _userService = inject(UserService);
  private _router = inject(ActivatedRoute);
  // queryParams: UserListFilterRequest = new UserListFilterRequest();
  queryParams: UserListFilterRequest = new UserListFilterRequest().toObject();

  ngOnInit(): void {    
      this.getUsers(this.queryParams);
   
   
  }

  private getUsers(params: UserListFilterRequest): void {
    this._userService.getUserList(params).subscribe({
      next: (res) => this.onGetUsersSuccess(res),
      error: (err) => this.onGetUsersError(err)
    });
  }

  private onGetUsersSuccess(res: any): void {
    console.log('Respuesta de getUsers:', res);
    this.userListResponse = res;
    console.log(res.Users); 
    this.userInfoResponse = res.Users; // Ajusta esto según la estructura de tu respuesta
  }

  private onGetUsersError(err: any): void {
    console.error(err);
  }

  onButtonClickDelOutput(event: Event): void {
    console.log('Botón presionado', event);
  }

   

}
