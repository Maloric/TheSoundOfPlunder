import { Observable, Subscription } from 'rxjs/Rx';
import { OnDestroy, OnInit } from '@angular/core/core';
import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LOG_TWEET } from 'app/services/twitter';

require('app/services/signalr/lib/jquery-1.6.4.js');
require('app/services/signalr/lib/jquery.signalR.js');
require('app/services/signalr/lib/hubs.js');

@Injectable()
export class SignalRService implements OnInit, OnDestroy {
    private twitterHub: any;
    private query$: Subscription;
    private started: boolean;

    constructor(private store: Store<AppState>, private _ngZone: NgZone) {
        const $ = (<any>window).$;
        this.twitterHub = $.connection.twitterHub;
        this.query$ = this.store
            .map(s => s.twitter.query)
            .distinctUntilChanged()
            .filter(q => q !== '')
            .subscribe((query) => {
                if (this.started) {
                    this.stop();
                    this.serviceStarted(query);
                    this.started = false;
                } else {
                    this.start(query);
                    this.started = true;
                }
            });
    };

    start(searchTerms: string) {
        this.twitterHub.client.updateStatus = (status: string) => {
            console.log('Live signalR Twitter stream status:', status);
        };

        this.twitterHub.client.updateTweet = (tweet: any) => {
            this._ngZone.run(() => this.updateTweet(tweet));
        };

        const $ = (<any>window).$;
        $.connection.hub.start({ withCredentials: false }).done(() => {
            this.serviceStarted(searchTerms);
        });
    }

    stop() {
        const $ = (<any>window).$;
        (<any>window).$.connection.twitterHub.server.stopTwitterLive();
    }

    serviceStarted(searchTerms) {
        (<any>window).$.connection.twitterHub.server.startTwitterLive(searchTerms);
    }

    updateTweet(tweet: any) {
        this.store.dispatch({ type: LOG_TWEET, payload: tweet });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.query$.unsubscribe();
    }
}