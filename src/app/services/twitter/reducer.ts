import { Action } from '@ngrx/store';

import { LOG_TWEET } from './actions';

export class TweetState {
    tweets: any[];
    hashtags: { [name: string]: number };
};

export const InitialTweetState: TweetState = {
    tweets: [],
    hashtags: {}
};

export function TwitterReducer(state: TweetState = InitialTweetState, action: Action): TweetState {
    switch (action.type) {
        case LOG_TWEET:
            const newState = Object.assign({}, state, {
                tweets: [...state.tweets, action.payload.Generated],
            })
            if (newState.tweets.length > 100) {
                newState.tweets = newState.tweets.slice(1, 102);
            }
            newState.hashtags = JSON.parse(JSON.stringify(state.hashtags));

            let key: string;
            for (let i = 0; i < action.payload.Hashtags.length; i++) {
                key = action.payload.Hashtags[i].text;
                if (newState.hashtags[key]) {
                    newState.hashtags[key]++;
                } else {
                    newState.hashtags[key] = 1;
                }
            }
            return newState;
        default:
            return state;
    }
};
