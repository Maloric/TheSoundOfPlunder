import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { getTweets } from 'app/app.selectors';
import { AppState } from 'app/app.state';
import { TweetState } from 'app/services/twitter/reducer';

@Injectable()
export class InsightsViewModel {
    hashtags$: Observable<any> = this.store.select('twitter')
        .map((x: TweetState) => x.hashtags).publishReplay(1)
        .refCount();

    constructor(private store: Store<AppState>) { }
}