import { ApiModule } from './../../PruebasApi/api.module';
import { Component, OnInit, Inject, inject } from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../PruebasApi/api/auth.service';
import { Router } from '@angular/router';
import { BrandingService } from '../../services/branding.service';
import { NavmenuComponent } from '../navmenu/navmenu.component';
// import { AuthService } from '../../ClientApi/api/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavmenuComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent implements OnInit {
  // public authService = inject(AuthService);
  public brandingService = inject(BrandingService);
  public storageService = inject(StorageService);
  public router = inject(Router);
  public authService = inject(AuthService)


  // loginForm!: FormGroup;

  loginForm = new FormGroup({
    emailLoginForm:     new FormControl<string>('partner@gigas.com', [Validators.email, Validators.required,]           ),
    passwordLoginForm:  new FormControl<string>('1234',              [ Validators.minLength(3),  Validators.required,]  ),
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.generateFormLogin();
    this.brandingService.getBrandingInformation().subscribe({
      next: (data) => {

        console.log('BrandiingInformation', data);
      },
      error: (err) => {
        console.log('Error brandingINformation')
      },
    });
  }

  // generateFormLogin() {
  //   this.loginForm = this.fb.group({
  //     emailLoginForm: [
  //       'partner@gigas.com',
  //       [Validators.required, Validators.email],
  //     ],
  //     passwordLoginForm: [
  //       '1234',
  //       [Validators.required, Validators.minLength(4)],
  //     ],
  //   });
  // }

  login() {
    const { emailLoginForm, passwordLoginForm } = this.loginForm.value;
    // this.authService.authLoginPost({
    //   Email: emailLoginForm!,
    //   Password: passwordLoginForm!,
    //   PartnerId: 1}).subscribe({
    //   next: (data) => {
    //     this.storageService.saveUser(data);
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     // this.router.navigate(['/profile']);
    //     console.log('login ok');
    //     this.router.navigateByUrl('/home');
    //     console.log('redirigo a home');
    //   },

    this.authService.authSignInPost({email: emailLoginForm!, password: passwordLoginForm!, partnerId: 1}).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.router.navigate(['/profile']);
        console.log('login ok');
        this.router.navigateByUrl('/home');
        console.log('redirigo a home');
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }


}



