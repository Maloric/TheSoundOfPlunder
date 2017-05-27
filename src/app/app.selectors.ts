import { Observable } from 'rxjs/Rx';
import { AppState } from './app.state';

export function getLastMsg() {
    return (state$: Observable<AppState>) => state$.map(s => s.twitter.lastMsg);
}
