import { Component, OnInit, Inject, inject } from '@angular/core';

import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {
 
  public authService = inject(AuthService );
  public storageService = inject( StorageService);
 
  
  loginForm!: FormGroup;
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  
  constructor(private fb: FormBuilder) 
    {

    }

  ngOnInit(): void {
    this.generateFormLogin();    
  }

  generateFormLogin() {
    this.loginForm = this.fb.group({
      emailLoginForm: ['partner@gigas.com', [Validators.required, Validators.email]],
      passwordLoginForm: ['1234', [Validators.required, Validators.minLength(4)]],
    });
  }

 
  login(){
     const { emailLoginForm, passwordLoginForm } = this.loginForm.value
     this.authService.login(emailLoginForm, passwordLoginForm, 1).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.storageService.getUser().roles;
        console.log('ok');
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

    
  }

  

