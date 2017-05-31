import { Tweet } from '../../services/twitter/reducer';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// import { getTweets } from 'app/app.selectors';
import { AppState } from 'app/app.state';
import { TweetState } from 'app/services/twitter/reducer';

@Injectable()
export class LogViewModel {
    tweets$: Observable<Tweet[]> = this.store
        .select('twitter')
        .map((x: TweetState) => x.tweets.filter(t => t.id === x.selectedTweetId || !x.selectedTweetId))
        .publishReplay(1)
        .refCount();

    constructor(private store: Store<AppState>) { }
}