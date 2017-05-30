import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnChanges {

  @ViewChild('chart')
  private chartContainer: ElementRef;

  @Input()
  hashtags: { [key: string]: number }

  private keys: string[];

  constructor() { }

  ngOnChanges() {
    this.keys = Object.keys(this.hashtags);

    this.updateChart();
  }

  updateChart() {
    let bars = d3.select(this.chartContainer.nativeElement)
      .selectAll('div')
      .sort((a: string, b: string) => this.hashtags[b] - this.hashtags[a])
      .data(this.keys.slice(0, 10));

    bars.enter()
      .append('div')
      .attr('class', 'bar')
      .style('width', (key) => {
        return this.hashtags[key] * 10 + 'px';
      })
      .text(key => key);

    bars.exit().remove();

    bars.transition().style('width', (key) => {
      return this.hashtags[key] * 10 + 'px';
    }).text(key => key);;
  }

}
