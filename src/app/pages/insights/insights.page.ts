import { Component, OnInit } from '@angular/core';

import { InsightsViewModel } from './insights.viewmodel';

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.css']
})
export class InsightsPageComponent {

  constructor(private viewModel: InsightsViewModel) { }

}
