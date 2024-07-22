import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { ComputersComponent } from './pages/computers/computers.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardComponent,canActivate: [authGuard],
  children: [
    { path: 'users', component: UserListComponent,canActivate: [authGuard], },
    { path: 'computers', component: ComputersComponent,canActivate: [authGuard], },
    { path: 'users/:userId', component: UserDetailsComponent,canActivate: [authGuard], },
  ]
  }


];
