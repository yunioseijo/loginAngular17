import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserInfoResponse, IUserListResponse, UserListFilterRequest } from '../../Models/userList.model';
import { switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent {
  userInfoResponse: IUserInfoResponse[]=[];
  userListResponse: IUserListResponse | undefined;
  
  private _userService = inject(UserService);
  private _router = inject(ActivatedRoute);
  queryParams: UserListFilterRequest = new UserListFilterRequest();

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

   

}
