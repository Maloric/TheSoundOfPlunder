import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { RESET, UPDATE_QUERY } from 'app/services/twitter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<AppState>) { }

  onQueryUpdate(query) {
    console.log('onQueryUpdate');
    this.store.dispatch({ type: RESET });
    this.store.dispatch({ type: UPDATE_QUERY, payload: query });
  }
}
