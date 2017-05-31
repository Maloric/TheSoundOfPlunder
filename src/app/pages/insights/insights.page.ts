import { Component, OnInit } from '@angular/core';

import { InsightsViewModel } from './insights.viewmodel';

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights.page.html',
  styleUrls: ['./insights.page.scss']
})
export class InsightsPageComponent {

  constructor(public viewModel: InsightsViewModel) { }

}
