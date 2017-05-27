import { TwitterReducer } from './services/twitter/reducer';
import { AppStateReducer } from './app.state';

export const AppReducer: AppStateReducer = {
    twitter: TwitterReducer
};