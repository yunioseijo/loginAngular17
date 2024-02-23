import { Component, ElementRef, HostListener, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit {
  ngOnInit(): void {

  this.userService.getCurrentUser().subscribe({
    next: (user) => {
      console.log(user);
      this.userName=user.email;
    }
  })
  }
  // public showContent = signal(false);
  public authService = inject(AuthService);
  public userService = inject(UserService);
  public storageService = inject(StorageService);
  public router = inject(Router);
  public eRef = inject(ElementRef);


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
