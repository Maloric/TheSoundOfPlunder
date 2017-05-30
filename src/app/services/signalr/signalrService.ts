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

    constructor(private store: Store<AppState>, private _ngZone: NgZone) {
        const $ = (<any>window).$;
        this.twitterHub = $.connection.twitterHub;
        this.query$ = this.store.map(s => s.twitter.query)
            .filter(q => q !== '')
            .subscribe((query) => {
                console.log('textChanged', query);
                this.start(query);
            });
    };

    start(searchTerms: string) {
        console.log(searchTerms);
        this.twitterHub.client.updateStatus = (status) => {
            console.log('Live signalR Twitter stream status:', status);
        };

        this.twitterHub.client.updateTweet = (tweet) => {
            console.log('updateTweet', tweet);
            this._ngZone.run(() => this.updateTweet(tweet));;
        };

        const $ = (<any>window).$;
        $.connection.hub.start({ withCredentials: false }).done(() => {
            this.serviceStarted(searchTerms);
        });
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