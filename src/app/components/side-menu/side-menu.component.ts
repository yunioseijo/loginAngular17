import { Component, NgModule, inject } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { SafeHtmlPipe } from '../../Pipes/safehtml.pipe';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarComponent,SafeHtmlPipe],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  sanitizer= inject(DomSanitizer)
  public menuItems = routes
      .map((route) => route.children ?? [])    
      .flat()    
      .filter((route) => route && route.path)    
      .filter((route) => !route.path?.includes(':'))
      .map((route) => ({
          path: route.path,
          title: route.title,
          icon: route.data?.['icon'] // Accede a la propiedad 'icon' desde 'data'
      }));

      getSafeHtml(html: string) {
        console.log(html);
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}