import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EditUsrComponent } from './components/edit-usr/edit-usr.component';

export const routes: Routes = [
    {
        path:"",
        component: LoginComponent
    },

    {
        path:"admin-dashboard",
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {role:'admin'}
    },
    {
        path:'edit-user/:id',
        component: EditUsrComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {role:'admin'}
    },
    {
        path:"user-dashboard",
        component: UserDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {role:'user'}
    }
];
