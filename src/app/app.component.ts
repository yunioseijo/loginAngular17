import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { StorageService } from './services/storage.service';
import { UserListComponent } from './dashboard/pages/user-list/user-list.component';
import { UserDetailsComponent } from './dashboard/pages/user-details/user-details.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent, UserDetailsComponent, RouterLink, RouterLinkActive ],
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


  public storageService = inject(StorageService);
  public router = inject(Router);


  ngOnInit(): void {
    console.log('on it appComponent');
  }



}
