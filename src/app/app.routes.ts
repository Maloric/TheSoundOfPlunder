import { DashboardPageComponent, LogPageComponent, PageNotFoundComponent } from './pages';

import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    { path: 'log', component: LogPageComponent },
    { path: 'dashboard', component: DashboardPageComponent },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];
