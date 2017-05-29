import { Component, OnInit } from '@angular/core';

import { AppState } from '../../app.state';

import { FeedViewModel } from './feed.viewmodel';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss']
})
export class FeedPageComponent implements OnInit {

  constructor(private viewModel: FeedViewModel) {
  }

  ngOnInit() {
  }

}
