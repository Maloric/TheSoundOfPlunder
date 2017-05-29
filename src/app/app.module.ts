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
import { } from './pages';
import {
  DashboardPageComponent,
  LogPageComponent,
  PageNotFoundComponent,
  DashboardViewModel,
  LogPageRouteHandler,
  LogViewModel
} from './pages';
import { SignalRService } from './services/signalr/signalrService';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    LogComponent,
    LogPageComponent,
    PageNotFoundComponent,
    TwitterFeedComponent
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(AppReducer)
  ],
  providers: [
    DashboardViewModel,
    LogViewModel,
    SignalRService,
    LogPageRouteHandler
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
