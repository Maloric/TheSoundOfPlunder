import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LOG_TWEET } from 'app/services/twitter';

require('app/services/signalr/lib/jquery-1.6.4.js');
require('app/services/signalr/lib/jquery.signalR.js');
require('app/services/signalr/lib/hubs.js');

@Injectable()
export class SignalRService {
    private twitterHub: any;
    constructor(private store: Store<AppState>) {
        const $ = (<any>window).$;
        this.twitterHub = $.connection.twitterHub;
    };

    start() {
        // console.log('start');
        const $ = (<any>window).$;
        $.connection.hub.start().done(() => {
            this.serviceStarted();
        });

        this.twitterHub.client.updateStatus = (status) => {
            console.log('status', status);
        };

        this.twitterHub.client.updateTweet = (tweet) => {
            console.log('updateTweet', tweet);
            this.store.dispatch({ type: LOG_TWEET, payload: tweet });
        };
    }

    serviceStarted() {
        // console.log('service started');
        (<any>window).$.connection.twitterHub.server.startTwitterLive();
    }
}