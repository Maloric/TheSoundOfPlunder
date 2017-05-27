import { DashboardViewModel } from './dashboard.viewmodel';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private viewModel: DashboardViewModel) {

  }

  ngOnInit() {
  }

}
