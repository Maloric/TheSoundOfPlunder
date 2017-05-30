import { LOG_TWEET, LOG_SET_ID, RESET, UPDATE_QUERY } from './actions';
import { TwitterReducer, TweetState, InitialTweetState } from './reducer';

describe('TwitterReducer', () => {
  let state: TweetState;
  let mockTweet: any;

  beforeEach(() => {
    state = InitialTweetState;
    mockTweet = {
      id: '1',
      html: '<blockquote class=\"twitter-tweet\">test</blockquote>',
      hashtags: ['universal', 'unique1']
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
      expect(newState.hashtags).toEqual({
        universal: 1,
        unique1: 1
      });
    });

    describe('and more tweets are received', () => {
      beforeEach(() => {
        const mockTweet2 = {
          id: '2',
          html: '<blockquote class=\"twitter-tweet\">test2</blockquote>',
          hashtags: ['universal', 'unique2']
        };

        const mockTweet3 = {
          id: '3',
          html: '<blockquote class=\"twitter-tweet\">test3</blockquote>',
          hashtags: ['universal', 'unique3']
        };

        newState = TwitterReducer(newState, {
          type: LOG_TWEET,
          payload: mockTweet2
        });

        newState = TwitterReducer(newState, {
          type: LOG_TWEET,
          payload: mockTweet3
        });
      });

      it('should add each new tweet to the store', () => {
        expect(newState.tweets.length).toEqual(3, 'New tweets are added to the array');
      });

      it('should add each hashtag to the store', () => {
        expect(newState.hashtags.universal).toEqual(3, 'Existing hashtag count is incremented');
        expect(newState.hashtags.unique1).toEqual(1, 'Existing hashtags are not removed');
        expect(newState.hashtags.unique2).toEqual(1, 'New hashtag is added');
        expect(newState.hashtags.unique3).toEqual(1, 'New hashtag is added');
      });
    });
  });

  it('should only keep the last 100 tweets in the store', () => {
    let newState: TweetState = state;
    expect(state.tweets.length).toEqual(0);

    for (let i = 0; i < 100; i++) {
      newState = TwitterReducer(newState, {
        type: LOG_TWEET,
        payload: {
          id: i,
          html: 'Tweet ' + i,
          hashtags: ['universal', 'unique' + i]
        }
      });
      expect(newState.tweets.length).toEqual(i + 1, 'New tweets are added to the array');
    }
    expect(newState.tweets.length).toEqual(100, 'There are 100 tweets');
    expect(newState.tweets.filter(x => x.id === 0).length).toBe(1, 'The first tweet is still present');

    newState = TwitterReducer(newState, {
      type: LOG_TWEET,
      payload: {
        id: '101',
        html: 'Tweet 101',
        hashtags: ['universal', 'unique101']
      }
    });

    expect(newState.tweets.length).toEqual(100, 'There are still 100 tweets');
    expect(newState.tweets.filter(x => x.id === 0).length).toBe(0, 'The first has been removed');
    expect(newState.hashtags.universal).toEqual(101, 'ALL hashtag counts are kept');
    expect(newState.hashtags.unique1).toEqual(1, 'ALL hashtag counts are kept');
    expect(newState.hashtags.unique101).toEqual(1, 'New hashtag is added');

    expect(newState).not.toBe(state);
  });

  describe('when a LOG_SET_ID action is received', () => {
    let newState: TweetState;
    beforeEach(() => {
      newState = TwitterReducer(state, {
        type: LOG_SET_ID,
        payload: '1337'
      });
    });

    it('should set the selected tweet id in the store', () => {
      expect(newState.selectedTweetId).toEqual('1337');
      expect(newState).not.toBe(state);
    });
  });



  describe('when an UPDATE_QUERY action is received', () => {
    let newState: TweetState;
    beforeEach(() => {
      newState = TwitterReducer(state, {
        type: UPDATE_QUERY,
        payload: 'testQuery'
      });
    });

    it('should reset the store to its initial state', () => {
      expect(newState.query).toEqual('testQuery');
      expect(newState).not.toBe(state);
    });
  });



  describe('when a RESET action is received', () => {
    let newState: TweetState;
    beforeEach(() => {
      newState = TwitterReducer(state, {
        type: RESET
      });
    });

    it('should reset the store to its initial state', () => {
      expect(JSON.stringify(newState)).toEqual(JSON.stringify(InitialTweetState));
      expect(newState).not.toBe(state);
    });
  });


});
