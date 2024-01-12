import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  public showContent = signal(false);
  public authService = inject(AuthService);
  public storageService = inject(StorageService);
  public router = inject(Router);
  public eRef = inject(ElementRef);

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  public toggleContent (){
    console.log('mostrar opciones de avatar');
    this.showContent.update(value => !value);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showContent.set(false); // Oculta el menú si el clic fue fuera del componente
    }
  }

//   logout() {
//   this.authService.logout().subscribe({
//     next: (data) => {
//       this.storageService.clean();
      
//       this.isLoggedIn = false;
//       this.router.navigate(['/home']);
//     },
//     error: (err) => {
//       this.errorMessage = err.error.message;
//       this.isLoginFailed = true;
//     },
//   });

// }
  logout() {
        this.storageService.clean();      
      this.isLoggedIn = false;
      this.router.navigate(['/login']);    

}

}
