import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LOG_EVENT } from 'app/components/log';

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
            console.log('updateTweet', tweet);
            this.store.dispatch({ type: LOG_EVENT, payload: tweet });
        };
    }
}