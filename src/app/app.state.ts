import { LogState } from 'app/log/log.reducer';
import { Action } from '@ngrx/store';

export interface AppState {
    log: LogState;
};

type Reducer<AppStateType> = {
    [StateKey in keyof AppStateType]: (X: AppStateType[StateKey], Y: Action) => AppStateType[StateKey];
};

export type AppStateReducer = Reducer<AppState>;
