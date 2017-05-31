import { ReplaySubject } from 'rxjs/Rx';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { InsightsViewModel } from './';
import { Tweet } from 'app/services/twitter/reducer';
import { LOG_TWEET } from 'app/services/twitter';
import { AppReducer } from 'app/app.reducers';

describe('Insights page - view model', () => {
    let store: Store<AppState>;
    let mockStoreData: AppState;

    let mockStore: ReplaySubject<AppState>;
    let unit: InsightsViewModel;
    let mockTweet: Tweet;

    beforeEach(() => {
        mockTweet = {
            id: 123,
            hashtags: ['test1', 'test2'],
            html: 'test'
        }
        TestBed.configureTestingModule({
            imports: [StoreModule.provideStore(AppReducer)],
            declarations: [],
            providers: []
        });
    });

    beforeEach(inject([Store],
        (str: Store<AppState>) => {
            store = str;
            unit = new InsightsViewModel(store);
        }));

    describe('observables in constructor', () => {
        beforeEach(() => {
            store.dispatch({ type: LOG_TWEET, payload: mockTweet });
        });

        it('should have a hashtags$ observable linked to the store', (done) => {
            unit.hashtags$.subscribe((hashtags: { [key: string]: number }) => {
                let keys = Object.keys(hashtags);

                expect(keys).toBeDefined();
                expect(keys.length).toEqual(2);

                expect(hashtags.test1).toEqual(1);
                expect(hashtags.test2).toEqual(1);

                done();
            });
        });

        describe('when a second tweet is received with new or existing hashtags', () => {
            let mockTweet2: Tweet;
            beforeEach(() => {
                mockTweet2 = {
                    id: 456,
                    hashtags: ['test1', 'test3'],
                    html: 'test2'
                };
                store.dispatch({ type: LOG_TWEET, payload: mockTweet2 });
            });

            it('should update the existing hashtags and add the new ones', (done) => {
                unit.hashtags$.subscribe((hashtags: { [key: string]: number }) => {
                    let keys = Object.keys(hashtags);

                    expect(keys).toBeDefined();
                    expect(keys.length).toEqual(3);

                    expect(hashtags.test1).toEqual(2);
                    expect(hashtags.test2).toEqual(1);
                    expect(hashtags.test3).toEqual(1);

                    done();
                });
            });
        });
    });
});
