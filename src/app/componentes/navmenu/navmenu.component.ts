import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navmenu.component.html',
  styles: ``
})
export class NavmenuComponent {

  authService = inject(AuthService);

  

}
