import { Action } from '@ngrx/store';

import { LOG_TWEET } from './actions';

export class TweetState {
    tweets: any[];
};

export const InitialTweetState: TweetState = {
    tweets: []
};

export function TwitterReducer(state: TweetState, action: Action): TweetState {
    switch (action.type) {
        case LOG_TWEET:
            const newState = Object.assign({}, state, {
                tweets: [...state.tweets, action.payload]
            })
            if (newState.tweets.length > 100) {
                newState.tweets = newState.tweets.slice(1, 102);
            }
            return newState;
        default:
            return state;
    }
};
