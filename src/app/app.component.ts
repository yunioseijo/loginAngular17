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
  //   this.isLoggedIn = this.storageService.isLoggedIn();
  //   console.log('Esta logueado?', this.isLoggedIn);
  //   if (this.isLoggedIn) {
  //     this.userService.getCurrentUser().subscribe({
  //       next: (data) => {
  //         // la variable data contiene ejemplo:     {  "UserId": 2, "Profiles": 2, "Email": "partner@gigas.com",  "Culture": "es-ES",  "Name": "Partner 1",
  //         // "LastName": "Administrator",  "IsResqtimeUser": false, "PartnerSupportEmail": "support@gigas.com",  "PartnerId": 1}
  //         //actualizar la variable de si puede mostrar oh no dashboard
  //         const profile = data.Profiles;
  //         console.log('Profile', data.Profiles);
  //         console.log(data);

  //         this.userService.checkProfile(profile).subscribe({
  //           next:(dat) => {
  //             console.log('Respuesta de profile',dat);
  //         },
  //         error: (err) => {
  //           this.errorMessage = err.error.message;
  //         },
  //       });
  //       },
  //       error: (err) => {
  //         this.errorMessage = err.error.message;
  //       },
  //     });
  //   }
  // }
  console.log('on it appComponent');
  
    // this.generateFormLogin();
    this.brandingService.getBrandingInformation().subscribe({
      next: (data: IBrandingInformation) => {
        const {PrimaryColor, SecondaryColor} = data;
        document.documentElement.style.setProperty('--primary-color',PrimaryColor);
        document.documentElement.style.setProperty('--secondary-color',SecondaryColor);
        console.log('PrimaryColor',PrimaryColor);
        console.log('BrandiingInformation', data);
      },
      error: (err) => {
        console.log('Error brandingINformation')
      },
    });


  }



}
