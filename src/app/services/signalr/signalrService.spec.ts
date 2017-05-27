import { Store } from '@ngrx/store';
import { async, inject, TestBed } from '@angular/core/testing';

import { LOG_TWEET } from 'app/services/twitter';

import { SignalRService } from './signalrService';

require('./lib/jquery-1.6.4.js');
require('./lib/jquery.signalR.js');
require('./lib/hubs.js');

describe('The SignalR service', () => {
    let mockStore: any;
    const $ = (<any>window).$;
    const twitterHub = $.connection.twitterHub;
    let unit: SignalRService;

    beforeEach(() => {
        // intialize mocks
        mockStore = { dispatch: jasmine.createSpy('dispatch') };
        TestBed.configureTestingModule({
            providers: [
                // dependencies
                SignalRService,
                { provide: Store, useValue: mockStore }
            ]
        });
    });

    beforeEach(async(inject([SignalRService], (sut: SignalRService) => {
        unit = sut;
    })));

    describe('when the service is started', () => {
        beforeEach(() => {
            unit.serviceStarted();
        });

        it('should set up the client callbacks', () => {
            expect(twitterHub.client.updateTweet).toBeDefined();
        });

        describe('and a new tweet arrives via signalR', () => {
            let tweet: any;
            beforeEach(() => {
                tweet = {
                    test: 'data'
                };
                twitterHub.client.updateTweet(tweet);
            });

            it('dispatches the LOG_TWEET action with the tweet data', () => {
                expect(mockStore.dispatch).toHaveBeenCalledWith({
                    type: LOG_TWEET,
                    payload: tweet
                });
            });
        });
    });
});