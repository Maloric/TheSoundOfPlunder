import { AppStateReducer } from './app.state';
import { logReducer } from './log';

export const AppReducer: AppStateReducer = {
    log: logReducer
};