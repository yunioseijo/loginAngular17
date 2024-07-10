import { Component, ElementRef, HostListener, OnInit, inject, signal } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService, GetAuthenticatedUserResponse } from '../../PruebasApi';


@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit {
  public storageService = inject(StorageService);
  public router = inject(Router);
  public eRef = inject(ElementRef);
  private authService = inject(AuthService);
  public user: GetAuthenticatedUserResponse = {} as GetAuthenticatedUserResponse;
  ngOnInit(): void {
    this.authService.authCurrentUserPost().subscribe(
      (user => this.user = user)
    )

  // this.userService.getCurrentUser().subscribe({
  //   next: (user) => {
  //     console.log(user);
  //     this.userName=user.email;
  //   }
  // })

  }
  // public showContent = signal(false);




  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userName = '';


  logout() {
        this.storageService.clean();
      this.isLoggedIn = false;
      this.router.navigate(['/login']);

}

}
