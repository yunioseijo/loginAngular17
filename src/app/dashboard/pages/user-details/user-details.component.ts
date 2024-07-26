import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ComputerDetailsComponent } from "../../components/computerDetails/computerDetails.component";
import { ComputerService, GetUserComputersResponse, GetUserDetailsResponse, UserService } from '../../../PruebasApi';
import { GetUserDetailsRequest } from './../../../PruebasApi/model/getUserDetailsRequest';
import { ProgressBarModule } from 'primeng/progressbar';
import { switchMap } from 'rxjs';
import { DetailsUserComponent } from "../../components/details-user/details-user.component";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    AccordionModule,
    CommonModule,
    ComputerDetailsComponent,
    ComputerDetailsComponent,
    ProgressBarModule,
    RouterOutlet,
    DetailsUserComponent
],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}
  userDetails: GetUserDetailsResponse = {} as GetUserDetailsResponse;
  userComputers: GetUserComputersResponse[] = [];
  isLoading: boolean = true;
  userInfo = signal<GetUserDetailsResponse | undefined>(undefined);
  userId = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['userId'];
      this.userId.set(userId);
      this.loadUserDetails(userId);
      this.loadUserComputers(userId);
    });
  }
  loadUserComputers(userId: number) {
    this.isLoading= true;
    this.userService.userGetUserComputersPost({ userId } as GetUserDetailsRequest)
    .subscribe({
      next: userComputers => {
        this.userComputers = userComputers;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error fetching user computers', error);
        this.isLoading = false;
      }
    });
  }
  loadUserDetails(userId: number) {
    this.isLoading= true;
    this.userService.userGetUserDetailsPost({ userId } as GetUserDetailsRequest)
    .subscribe({
      next: userDetails => {
        this.userInfo.set(userDetails);
        this.isLoading = false;
      },
      error: error => {
        console.error('Error fetching user details', error);
        this.isLoading = false;
      }
    });
  }



  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .pipe(
  //       switchMap(({ userId }) =>
  //         this.userService.userGetUserDetailsPost({ userId } as GetUserDetailsRequest).pipe(
  //           switchMap(userDetails => {
  //             this.userDetails = userDetails;
  //             return this.userService.userGetUserComputersPost({ userId } as GetUserDetailsRequest);
  //           })
  //         )
  //       )
  //     )
  //     .subscribe(
  //       userComputers => {
  //         this.userComputers = userComputers;
  //         this.isLoading = false;
  //       },
  //       error => {
  //         console.error('Error fetching user details or computers', error);
  //         this.isLoading = false;
  //       }
  //     );
  // }
}
