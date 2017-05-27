import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LOG_TWEET } from 'app/services/twitter';

@Injectable()
export class SignalRService {
    private twitterHub: any;
    constructor(private store: Store<AppState>) {
        const $ = (<any>window).$;
        this.twitterHub = $.connection.twitterHub;
    };

    serviceStarted() {
        this.twitterHub.client.updateStatus = (status) => {
            console.log('status', status);
        };

        this.twitterHub.client.updateTweet = (tweet) => {
            this.store.dispatch({ type: LOG_TWEET, payload: tweet });
        };
    }
}