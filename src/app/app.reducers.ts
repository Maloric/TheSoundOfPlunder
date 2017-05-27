import { AppStateReducer } from './app.state';
import { logReducer } from 'app/components/log';

export const AppReducer: AppStateReducer = {
    log: logReducer
};