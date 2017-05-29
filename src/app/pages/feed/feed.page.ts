import { Component, OnInit } from '@angular/core';

import { FeedViewModel } from './feed.viewmodel';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})
export class FeedPageComponent {

  constructor(private viewModel: FeedViewModel) { }

}
