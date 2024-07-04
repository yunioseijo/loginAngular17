import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BrandingService } from './services/branding.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { IBrandingInformation } from './Models/branding.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title = 'loginAngular17';
  errorMessage = '';

  public authService = inject(AuthService);
  public userService = inject(UserService);
  public brandingService = inject(BrandingService);
  public storageService = inject(StorageService);
  public router = inject(Router);


  ngOnInit(): void {
    console.log('on it appComponent');
  }



}
