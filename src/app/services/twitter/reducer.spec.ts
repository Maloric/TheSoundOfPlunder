import { LOG_TWEET } from './actions';
import { TwitterReducer, TweetState, InitialTweetState } from './reducer';
describe('TwitterReducer', () => {
    let state: TweetState;
    let mockTweet: any;
    beforeEach(() => {
        state = InitialTweetState;
        mockTweet = {
            generated: {
                'AuthorName': 'Test',
                'AuthorURL': 'https://twitter.com/test',
                // tslint:disable-next-line:max-line-length
                'HTML': '<blockquote class=\"twitter-tweet\">test</blockquote>',
                'URL': 'https://twitter.com/test/status/123',
                'ProviderURL': 'https://twitter.com',
                'Width': 550,
                'Height': 0,
                'Version': '1.0',
                'Type': 'rich',
                'CacheAge': '3153600000'
            }
        };
    });

    describe('when a LOG_TWEET action is received', () => {
        let newState: TweetState;
        beforeEach(() => {
            expect(state.tweets.length).toEqual(0);

            newState = TwitterReducer(state, {
                type: LOG_TWEET,
                payload: mockTweet
            });
        });

        it('should add the tweet to the TweetState.tweets array', () => {
            expect(newState.tweets.length).toEqual(1);
            expect(newState.tweets[0]).toBe(mockTweet);
            expect(newState).not.toBe(state);
        });

        it('should add all hastags in the tweet to the store', () => {

        });
    });

    describe('when more than 100 LOG_TWEET actions are received', () => {
        let newState: TweetState;
        beforeEach(() => {
            expect(state.tweets.length).toEqual(0);

            newState = state;

            for (let i = 0; i < 100; i++) {
                newState = TwitterReducer(newState, {
                    type: LOG_TWEET,
                    payload: {
                        data: 'Tweet ' + i
                    }
                });

                expect(newState.tweets.length).toEqual(i + 1, 'New tweets are added to the array');
            }
        });

        it('should only keep the last 100 tweets in the store', () => {
            expect(newState.tweets.length).toEqual(100, 'There are 100 tweets');
            expect(newState.tweets.filter(x => x.data === 'Tweet 0').length).toBe(1, 'The first tweet is still present');

            newState = TwitterReducer(newState, {
                type: LOG_TWEET,
                payload: {
                    data: 'Tweet 101'
                }
            });

            expect(newState.tweets.length).toEqual(100, 'There are still 100 tweets');
            expect(newState.tweets.filter(x => x.data === 'Tweet 0').length).toBe(0, 'The first has been removed');
            expect(newState).not.toBe(state);
        });
    });
});