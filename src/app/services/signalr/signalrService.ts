import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LOG_TWEET } from 'app/services/twitter';

require('app/services/signalr/lib/jquery-1.6.4.js');
require('app/services/signalr/lib/jquery.signalR.js');
require('app/services/signalr/lib/hubs.js');

@Injectable()
export class SignalRService {
    private twitterHub: any;
    constructor(private store: Store<AppState>, private _ngZone: NgZone) {
        const $ = (<any>window).$;
        this.twitterHub = $.connection.twitterHub;
    };

    start() {
        this.twitterHub.client.updateStatus = (status) => {
            console.log('Live signalR Twitter stream status:', status);
        };

        this.twitterHub.client.updateTweet = (tweet) => {
            this._ngZone.run(() => this.updateTweet(tweet));;
        };

        const $ = (<any>window).$;
        $.connection.hub.start().done(() => {
            this.serviceStarted();
        });
    }

    serviceStarted() {
        (<any>window).$.connection.twitterHub.server.startTwitterLive();
    }

    updateTweet(tweet: any) {
        this.store.dispatch({ type: LOG_TWEET, payload: tweet });
    }
}