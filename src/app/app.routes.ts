import {
    FeedPageComponent,
    InsightsPageComponent,
    LogPageComponent,
    LogPageRouteHandler,
    PageNotFoundComponent
} from './pages';

import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
    { path: 'log', component: LogPageComponent },
    { path: 'log/:id', component: LogPageComponent, canActivate: [LogPageRouteHandler] },
    { path: 'feed', component: FeedPageComponent },
    { path: 'insights', component: InsightsPageComponent },
    {
        path: '',
        redirectTo: '/feed',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];
