import { ReplaySubject } from 'rxjs/Rx';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { LogViewModel } from './';
import { Tweet } from 'app/services/twitter/reducer';
import { LOG_TWEET } from 'app/services/twitter';
import { AppReducer } from 'app/app.reducers';

describe('Log page - view model', () => {
    let store: Store<AppState>;
    let mockStoreData: AppState;

    let mockStore: ReplaySubject<AppState>;
    let unit: LogViewModel;
    let mockTweet = {
        id: 'mockTweet123',
        hashtags: [],
        html: 'test'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.provideStore(AppReducer)],
            declarations: [],
            providers: []
        });
    });

    beforeEach(inject([Store],
        (str: Store<AppState>) => {
            store = str;
            unit = new LogViewModel(store);
        }));

    describe('observables in constructor', () => {
        beforeEach(() => {
            store.dispatch({ type: LOG_TWEET, payload: mockTweet });
        });

        it('should have a tweets$ observable linked to the store', (done) => {
            unit.tweets$.subscribe((tweets: Tweet[]) => {
                expect(tweets).toBeDefined();
                expect(tweets.length).toEqual(1);
                expect(tweets[0].id).toEqual(mockTweet.id);
                done();
            });
        });
    });
});
