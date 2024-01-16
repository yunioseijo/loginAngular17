import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { UserComponent } from '../user/user.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FooterComponent } from '../footer/footer.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavmenuComponent, MatSlideToggleModule, UserComponent, MatSidenavModule,FooterComponent, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',


})
export class HomeComponent {


  constructor() {  }
  shouldRun: boolean = true;
  
}