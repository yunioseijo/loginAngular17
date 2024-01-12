import { Component } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NavmenuComponent } from '../navmenu/navmenu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavmenuComponent, SelectButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  stateOptions: any[] = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];
  value: string = 'off';
}
