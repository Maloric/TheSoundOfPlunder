import { Tweet } from '../twitter/reducer';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { async, inject, TestBed } from '@angular/core/testing';

import { LOG_TWEET, UPDATE_QUERY } from 'app/services/twitter';

import { SignalRService } from './signalrService';
import { AppState } from 'app/app.state';
import { ReplaySubject } from 'rxjs/Rx';
import { AppReducer } from 'app/app.reducers';
import { NgZone } from '@angular/core';

require('app/services/signalr/lib/jquery-1.6.4.js');
require('app/services/signalr/lib/jquery.signalR.js');
require('app/services/signalr/lib/hubs.js');

describe('The SignalR service', () => {
    let store: Store<AppState>;
    let mockZone: NgZone;

    const $ = (<any>window).$;
    const twitterHub = $.connection.twitterHub;
    let unit: SignalRService;

    let hubStartSpy: any;

    let mockTwitterHub = {
        client: {},
        server: {
            Register: jasmine.createSpy('RegisterSpy'),
            Unregister: jasmine.createSpy('UnregisterSpy')
        }
    }
    let RegisterSpy: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.provideStore(AppReducer),
                BrowserModule
            ],
            providers: [
                SignalRService

            ]
        });
    });

    beforeEach(inject([Store, NgZone],
        (str: Store<AppState>, zone: NgZone) => {
            store = str;
            mockZone = zone;
            unit = new SignalRService(store, mockZone);

            hubStartSpy = spyOn($.connection.hub, 'start').and.returnValue({
                done: ((callback: any) => {
                    callback();
                })
            });
            $.connection.twitterHub = mockTwitterHub;
        }));

    describe('when the query is updated with an empty query', () => {
        beforeEach(() => {
            store.dispatch({
                type: UPDATE_QUERY,
                payload: ''
            });
        });
        it('does nothing', () => {
            expect(hubStartSpy).not.toHaveBeenCalled();
        });
    });

    describe('when the query is updated with a non-empty query', () => {
        beforeEach(() => {
            store.dispatch({
                type: UPDATE_QUERY,
                payload: 'test'
            });
        });
        it('starts signalR', () => {
            expect(hubStartSpy).toHaveBeenCalled();
            expect(hubStartSpy).toHaveBeenCalledWith({ withCredentials: false });
            expect(mockTwitterHub.server.Register).toHaveBeenCalled();
            expect(mockTwitterHub.server.Register).toHaveBeenCalledTimes(1);
            expect(mockTwitterHub.server.Register).toHaveBeenCalledWith('test');
        });

        describe('and the query is updated again', () => {
            beforeEach(() => {
                hubStartSpy.calls.reset();
                mockTwitterHub.server.Register.calls.reset();
                store.dispatch({
                    type: UPDATE_QUERY,
                    payload: 'test2'
                });
            });
            it('stops the old stream and starts a new one', () => {
                expect(hubStartSpy).not.toHaveBeenCalled();
                expect(mockTwitterHub.server.Unregister).toHaveBeenCalled();
                expect(mockTwitterHub.server.Unregister).toHaveBeenCalledTimes(1);
                expect(mockTwitterHub.server.Register).toHaveBeenCalled();
                expect(mockTwitterHub.server.Register).toHaveBeenCalledTimes(1);
                expect(mockTwitterHub.server.Register).toHaveBeenCalledWith('test2');
            });
        });

        describe('and a new tweet arrives via signalR', () => {
            let tweet: Tweet;
            let dispatchSpy: any;
            let zoneSpy: any;
            beforeEach(() => {
                tweet = {
                    id: 123,
                    html: 'test',
                    hashtags: ['test1']
                };

                dispatchSpy = spyOn(store, 'dispatch');
                zoneSpy = spyOn(mockZone, 'run').and.callFake((cb) => {
                    cb(tweet);
                });
                $.connection.twitterHub.client.updateTweet(tweet);
            });

            it('dispatches the LOG_TWEET action with the tweet data', () => {
                expect(dispatchSpy).toHaveBeenCalledWith({
                    type: LOG_TWEET,
                    payload: tweet
                });
            });
        });
    });
});