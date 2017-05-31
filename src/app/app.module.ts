import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppReducer } from './app.reducers';
import { AppRoutes } from './app.routes';
import { AppState } from './app.state';
import { LogComponent } from './components/log/log.component';
import { TwitterFeedComponent } from './components/twitter-feed';
import { InsightsComponent } from './components/insights';
import { StartComponent } from './components/start';
import {
  AboutPageComponent,
  FeedPageComponent,
  FeedViewModel,
  InsightsPageComponent,
  InsightsViewModel,
  LogPageComponent,
  LogPageRouteHandler,
  LogViewModel,
  PageNotFoundComponent
} from './pages';
import { SignalRService } from './services/signalr/signalrService';


@NgModule({
  declarations: [
    AppComponent,
    FeedPageComponent,
    LogComponent,
    LogPageComponent,
    PageNotFoundComponent,
    TwitterFeedComponent,
    InsightsComponent,
    InsightsPageComponent,
    StartComponent,
    AboutPageComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(AppReducer)
  ],
  providers: [
    FeedViewModel,
    InsightsViewModel,
    LogViewModel,
    SignalRService,
    LogPageRouteHandler
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
