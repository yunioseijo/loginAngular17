import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './navmenu.component.html',
  styles: ``
})
export class NavmenuComponent {

  authService = inject(AuthService);

  

}
