import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ComputerDetailsComponent } from "../../components/computerDetails/computerDetails.component";
import { ComputerService, GetUserComputersResponse, GetUserDetailsResponse, UserService } from '../../../PruebasApi';
import { GetUserDetailsRequest } from './../../../PruebasApi/model/getUserDetailsRequest';
import { ProgressBarModule } from 'primeng/progressbar';
import { switchMap } from 'rxjs';

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
    ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  private userService = inject(UserService);

  constructor(private activatedRoute: ActivatedRoute) {}
  userDetails: GetUserDetailsResponse = {} as GetUserDetailsResponse;
  userComputers: GetUserComputersResponse[] = [];
  isLoading: boolean = true




  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ userId }) =>
          this.userService.userGetUserDetailsPost({ userId } as GetUserDetailsRequest).pipe(
            switchMap(userDetails => {
              this.userDetails = userDetails;
              return this.userService.userGetUserComputersPost({ userId } as GetUserDetailsRequest);
            })
          )
        )
      )
      .subscribe(
        userComputers => {
          this.userComputers = userComputers;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching user details or computers', error);
          this.isLoading = false;
        }
      );
  }
}
