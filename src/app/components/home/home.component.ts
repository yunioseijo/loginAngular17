import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavmenuComponent } from '../navmenu/navmenu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavmenuComponent, MatSlideToggleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
