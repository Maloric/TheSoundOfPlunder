import { DashboardViewModel } from './dashboard/dashboard.viewmodel';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppReducer } from './app.reducers';
import { AppState } from './app.state';
import { LogComponent } from './log/log.component';
import { DashboardComponent } from './dashboard/dashboard.component';

require('../assets/signalr/jquery-1.6.4.js');
require('../assets/signalr/jquery.signalR.js');
require('../assets/signalr/hubs.js');

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
