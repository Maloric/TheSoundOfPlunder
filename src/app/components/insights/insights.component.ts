import { Component, Input, OnInit } from '@angular/core';
import { d3 } from 'd3';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  @Input()
  hashtags: { [key: string]: number }

  constructor() { }

  ngOnInit() {
  }

}
