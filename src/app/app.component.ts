import { DashboardViewModel } from './dashboard/dashboard.viewmodel';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Globals } from './globals';
import { LOG_EVENT } from './log';

declare var Pusher: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  pusher: any;
  lastEvent: any = {};

  constructor(private store: Store<AppState>) {
    this.pusher = new Pusher(Globals.Pusher.key, {
      cluster: Globals.Pusher.cluster
    });

    const channel = this.pusher.subscribe(Globals.Pusher.channel);

    channel.bind('my-event', (data) => {
      this.store.dispatch({ type: LOG_EVENT, payload: data });
    });

    const $ = (<any>window).$;
    const twitterHub = $.connection.twitterHub;
    console.log('hub:', twitterHub);
    $.connection.hub.start().done(function () {
      console.log('hub started');


      twitterHub.server.startTwitterLive();
    });

    twitterHub.client.updateStatus = (status) => {
      console.log('status', status);
    };

    twitterHub.client.updateTweet = (tweet) => {
      console.log('updateTweet', tweet);
      this.store.dispatch({ type: LOG_EVENT, payload: tweet });
    };

    setInterval(() => {
      // this.store.dispatch({ type: LOG_EVENT, payload: { myfirstevent: Math.random() } });

      //   this.store.map(s => console.log(s.lastMsg));
    }, 1000);
  }
}
