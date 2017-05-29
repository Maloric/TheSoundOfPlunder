import { DashboardPageComponent, LogPageComponent, LogPageRouteHandler, PageNotFoundComponent } from './pages';

import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    { path: 'log', component: LogPageComponent },
    { path: 'log/:id', component: LogPageComponent, canActivate: [LogPageRouteHandler] },
    { path: 'dashboard', component: DashboardPageComponent },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];
