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

        describe('when subsequent tweets are received with new or existing hashtags', () => {
            let mockTweet2: Tweet;
            let mockTweet3: Tweet;
            beforeEach(() => {
                mockTweet2 = {
                    id: 456,
                    hashtags: ['test2', 'test3'],
                    html: 'test2'
                };
                mockTweet3 = {
                    id: 789,
                    hashtags: ['test2', 'test3'],
                    html: 'test3'
                };
                store.dispatch({ type: LOG_TWEET, payload: mockTweet2 });
                store.dispatch({ type: LOG_TWEET, payload: mockTweet3 });
            });

            it('should update the existing hashtags', (done) => {
                unit.hashtags$.subscribe((hashtags: { [key: string]: number }) => {
                    let keys = Object.keys(hashtags);

                    expect(keys).toBeDefined();
                    expect(keys.length).toEqual(3, 'The correct number of hashtags are present');

                    expect(hashtags.test1).toEqual(1);
                    expect(hashtags.test2).toEqual(3);
                    expect(hashtags.test3).toEqual(2);

                    done();
                });
            });

            it('should order the hashtags by most popular to least popular', (done) => {
                unit.hashtags$.subscribe((hashtags: { [key: string]: number }) => {
                    let keys = Object.keys(hashtags);

                    expect(keys[0]).toEqual('test2');
                    expect(keys[1]).toEqual('test3');
                    expect(keys[2]).toEqual('test1');

                    done();
                });
            });
        });
    });
});
