// import { ApiModule } from './../../PruebasApi/api.module';
import { Component, OnInit, Inject, inject } from '@angular/core';

// import { StorageService } from './services/storage.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { AuthService } from '../../PruebasApi/api/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { AuthResponse, AuthService } from '../../../PruebasApi';
import { GlobalService } from '../../../services/global.service';
// import { NavmenuComponent } from '../navmenu/navmenu.component';
// import { GlobalService } from '../../services/global.service';
// import { AuthService } from '../../ClientApi/api/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent implements OnInit {
  // public authService = inject(AuthService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private authService = inject(AuthService)
  private global = inject(GlobalService)

  get partner(){
    return this.global.getPartnerValue(location.hostname);
  }
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

  }

  login() {
    const { emailLoginForm, passwordLoginForm } = this.loginForm.value;

    this.authService.authSignInPost({email: emailLoginForm!, password: passwordLoginForm!, partnerId: this.partner}).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.router.navigate(['/profile']);
        console.log('login ok');
        this.router.navigateByUrl('/dashboard');
        console.log('redirigo a home');

      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }


}



