import { Routes } from '@angular/router';
import { authGuardMatch } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component'),//lo puedo hacer de esta manera porque exporto la clase por defecto
       
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile-editor/profile-editor.component'),//lo puedo hacer de esta manera porque exporto la clase por defecto
        canMatch: [authGuardMatch]
    },
    {

        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
