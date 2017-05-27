import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { getLastMsg } from 'app/app.selectors';
import { AppState } from 'app/app.state';

@Injectable()
export class DashboardViewModel {
    lastMsg$: Observable<any>;

    constructor(private store: Store<AppState>) {
        console.log(this.store);
        this.lastMsg$ = store.select('log').map((x: any) => {
            console.log('map', x);
            return x.lastMsg;
        });
    }
}