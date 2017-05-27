import { Store } from '@ngrx/store';
import { async, inject, TestBed } from '@angular/core/testing';

import { LOG_TWEET } from 'app/services/twitter';

import { SignalRService } from './signalrService';

describe('The SignalR service', () => {
    let mockStore: any;
    const $ = (<any>window).$;
    const twitterHub = $.connection.twitterHub;
    let unit: SignalRService;

    let mockHubStart: any;
    let mockTwitterStart: any;

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

    // describe('when the service is started', () => {
    //     beforeEach(() => {
    //         unit.serviceStarted();
    //     });

    //     it('should set up the client callbacks', () => {
    //         expect(twitterHub.client.updateTweet).toBeDefined();
    //     });

    //     describe('and a new tweet arrives via signalR', () => {
    //         let tweet: any;
    //         beforeEach(() => {
    //             tweet = {
    //                 test: 'data'
    //             };
    //             twitterHub.client.updateTweet(tweet);
    //         });

    //         it('dispatches the LOG_TWEET action with the tweet data', () => {
    //             expect(mockStore.dispatch).toHaveBeenCalledWith({
    //                 type: LOG_TWEET,
    //                 payload: tweet
    //             });
    //         });
    //     });
    // });

    // describe('when the start method is called', () => {
    //     beforeEach(() => {
    //         mockHubStart = jasmine.createSpy('mockHubStart', (<any>window).$.connection.hub.start);
    //         // .and.returnValue({
    //         //     done: ((callback: any) => {
    //         //         callback();
    //         //     })
    //         // });
    //         mockTwitterStart = jasmine.createSpy('mockTwitterStart', (<any>window).$.connection.twitterHub.startTwitterLive);
    //         unit.start();
    //     });

    //     it('should start the twitter stream', () => {
    //         expect(mockHubStart).toHaveBeenCalled();
    //     });

    // })

});