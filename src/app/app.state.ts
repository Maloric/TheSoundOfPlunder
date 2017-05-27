import { Action } from '@ngrx/store';

import { LogState } from 'app/components/log';

export interface AppState {
    log: LogState;
};

type Reducer<AppStateType> = {
    [StateKey in keyof AppStateType]: (X: AppStateType[StateKey], Y: Action) => AppStateType[StateKey];
};

export type AppStateReducer = Reducer<AppState>;
