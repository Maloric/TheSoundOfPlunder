import { LOG_TWEET } from './actions';
import { TwitterReducer, TweetState, InitialTweetState } from './reducer';
describe('TwitterReducer', () => {
    let state: TweetState;
    let mockTweet: any;
    beforeEach(() => {
        state = InitialTweetState;
        mockTweet = {
            this: 'is',
            a: 'tweet'
        };
    });

    it('should add the tweet to the TweetState.tweets array when a LOG_TWEET action is received', () => {
        expect(state.tweets.length).toEqual(0);

        const newState = TwitterReducer(state, {
            type: LOG_TWEET,
            payload: mockTweet
        });

        expect(newState.tweets.length).toEqual(1);
        expect(newState.tweets[0]).toBe(mockTweet);
        expect(newState).not.toBe(state);
    });

    it('should only keep the last 100 tweets', () => {
        let newState = state;

        for (let i = 0; i < 100; i++) {
            newState = TwitterReducer(newState, {
                type: LOG_TWEET,
                payload: {
                    data: 'Tweet ' + i
                }
            });

            expect(newState.tweets.length).toEqual(i + 1, 'New tweets are added to the array');
        }

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