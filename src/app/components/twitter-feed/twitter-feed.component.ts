import { ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitter-feed',
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TwitterFeedComponent {

  @Input()
  tweets: any[];

  constructor() { }

}
