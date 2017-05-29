import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'app/app.state';
import { LOG_SET_ID } from 'app/services/twitter';

@Injectable()
export class LogPageRouteHandler {

    constructor(
        private store: Store<AppState>,
        protected router: Router
    ) { };

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let logId = route.params['id'];

        this.store.dispatch({ type: LOG_SET_ID, payload: logId });

        return true;
    };
}
