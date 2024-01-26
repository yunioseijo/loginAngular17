import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavmenuComponent } from '../navmenu/navmenu.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FooterComponent } from '../footer/footer.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavmenuComponent, FooterComponent, SideMenuComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',


})
export class HomeComponent {
  navLinks = [
    { text: 'Home', path: '/home' },
    { text: 'About', path: '/about' },
    // otros links...
  ];


  constructor() {  }
  shouldRun: boolean = true;
  
}