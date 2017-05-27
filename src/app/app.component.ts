import { SignalRService } from './services/signalr/signalrService';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.state';
import { Globals } from './globals';
import { LOG_EVENT } from './components/log';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(signalRService: SignalRService) {
    signalRService.start();
  }
}
