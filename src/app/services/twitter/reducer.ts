import { Action } from '@ngrx/store';

import { LOG_SET_ID, LOG_TWEET, RESET, UPDATE_QUERY } from './actions';

export class Tweet {
    id: number;
    html: string;
    hashtags: string[];
}

export class TweetState {
    query: string;
    tweets: Tweet[];
    hashtags: { [name: string]: number };
    selectedTweetId: number;
};

export const InitialTweetState: TweetState = {
    // query: 'twitch Twitch DnD dungeonsanddragons savageworlds crititcalrole d20',
    query: '',
    tweets: [],
    hashtags: {},
    selectedTweetId: undefined
};

export function TwitterReducer(state: TweetState = InitialTweetState, action: Action): TweetState {
    switch (action.type) {
        case LOG_TWEET:
            const newState = Object.assign({}, state, {
                tweets: [...state.tweets, action.payload],
            })
            if (newState.tweets.length > 100) {
                newState.tweets = newState.tweets.slice(1, 102);
            }
            newState.hashtags = JSON.parse(JSON.stringify(state.hashtags));

            let key: string;
            for (let i = 0; i < action.payload.hashtags.length; i++) {
                key = action.payload.hashtags[i];
                if (newState.hashtags[key]) {
                    newState.hashtags[key]++;
                } else {
                    newState.hashtags[key] = 1;
                }
            }
            return newState;
        case LOG_SET_ID:
            return Object.assign({}, state, { selectedTweetId: action.payload });
        case UPDATE_QUERY:
            return Object.assign({}, state, { query: action.payload });
        case RESET:
            return JSON.parse(JSON.stringify(InitialTweetState));
        default:
            return state;
    }
};
