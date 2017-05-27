import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppReducer } from './app.reducers';
import { AppState } from './app.state';
import { LogComponent } from './components/log/log.component';
import { DashboardComponent, DashboardViewModel } from './pages/dashboard';

require('app/services/signalr/lib/jquery-1.6.4.js');
require('app/services/signalr/lib/jquery.signalR.js');
require('app/services/signalr/lib/hubs.js');

@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(AppReducer)
  ],
  providers: [
    DashboardViewModel
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
