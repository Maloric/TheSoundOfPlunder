import { DashboardViewModel } from './dashboard.viewmodel';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private viewModel: DashboardViewModel) {
  }

  ngOnInit() {
  }

}
