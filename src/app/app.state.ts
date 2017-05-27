import { Action } from '@ngrx/store';

import { TwitterReducer, TweetState } from 'app/services/twitter';

export interface AppState {
    twitter: TweetState;
};

type Reducer<AppStateType> = {
    [StateKey in keyof AppStateType]: (X: AppStateType[StateKey], Y: Action) => AppStateType[StateKey];
};

export type AppStateReducer = Reducer<AppState>;
