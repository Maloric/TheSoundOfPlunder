import { Component, Input, OnInit } from '@angular/core';

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
