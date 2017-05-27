import { TweetState } from '../../services/twitter/reducer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { getTweets } from 'app/app.selectors';
import { AppState } from 'app/app.state';

@Injectable()
export class DashboardViewModel {
    tweets$: Observable<any> = this.store.select('twitter').map((x: TweetState) => {
        // console.log('x', x);
        return x.tweets;
    });

    constructor(private store: Store<AppState>) { }
}