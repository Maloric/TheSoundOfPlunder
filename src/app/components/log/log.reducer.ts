import { Testability } from '@angular/core/core';
import { AppState } from '../../app.state';
import { Action } from '@ngrx/store';

export const LOG_EVENT = 'LOG_EVENT';

export interface LogState {
    lastMsg: any;
};

const initialState: LogState = { lastMsg: { first: 'msg' } };

export function logReducer(state: LogState = initialState, action: Action): LogState {
    console.log('reducer', state, action);
    switch (action.type) {
        case LOG_EVENT:
            return Object.assign({}, state, {
                lastMsg: action.payload
            });
        default:
            return state;
    }
}
