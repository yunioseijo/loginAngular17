import { Routes } from '@angular/router';
import { authGuard,authGuard2, authGuardMatch } from './guards/auth.guard';
import { AuthGuard, } from './guards/authasync.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component'),//lo puedo hacer de esta manera porque exporto la clase por defecto
       
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile-editor/profile-editor.component'),//lo puedo hacer de esta manera porque exporto la clase por defecto
        // canMatch: [authGuardMatch]
        canActivate: [authGuard2]
    },
    {
        path: 'home',
         component: HomeComponent,
         canActivate: [authGuard]
    },
    {

        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
         component: PageNotFoundComponent
    },
];
