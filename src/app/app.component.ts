import { Component, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BrandingService } from './services/branding.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { IBrandingInformation } from './Models/branding.model';


import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AngularDashboardComponent } from './angular-dashboard/angular-dashboard.component';
import { AngularNavigationComponent } from './angular-navigation/angular-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule, ReactiveFormsModule,
    AngularDashboardComponent, AngularNavigationComponent,
    MatSidenavModule, MatButtonModule,MatIconModule, MatRadioModule, MatToolbarModule,  MatListModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 2},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );
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
    this.brandingService.getBrandingInformation().subscribe({
      next: (data: IBrandingInformation) => {
        const { PrimaryColor, SecondaryColor } = data;
        document.documentElement.style.setProperty('--primary-color', PrimaryColor );
        document.documentElement.style.setProperty('--secondary-color', SecondaryColor);
        console.log('PrimaryColor', PrimaryColor);
        console.log('BrandiingInformation', data);
      },
      error: (err) => {
        console.log('Error brandingINformation');
      },
    });
  }

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  

}
