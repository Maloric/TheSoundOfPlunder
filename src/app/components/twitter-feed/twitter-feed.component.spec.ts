import { DebugElement } from '@angular/core/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterFeedComponent } from './twitter-feed.component';

describe('TwitterFeedComponent', () => {
  let component: TwitterFeedComponent;
  let fixture: ComponentFixture<TwitterFeedComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterFeedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterFeedComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should display a placeholder when there are no tweets yet', () => {
    component.tweets = [];
    expect(element.textContent).toMatch(/Waiting for Twitter stream.../);
  });

  describe(' when there are tweets', () => {
    let tweets: any[];
    let tweetPanels: any[];
    beforeEach(() => {
      tweets = [
        {
          this: 'thing',
          HTML: '<div>test1</div>'
        },
        {
          this: 'other thing',
          HTML: '<div><strong>test2</strong></div>'
        }
      ];
      component.tweets = tweets;
      fixture.detectChanges();
      tweetPanels = element.querySelectorAll('.tweet');
    })

    it('should not display a placeholder', () => {
      expect(element.textContent).not.toMatch(/Waiting for Twitter stream.../);
    });

    it('should display one panel for each tweet', () => {
      expect(tweetPanels.length).toEqual(tweets.length);
      for (let i = 0; i < tweets.length; i++) {
        expect(tweetPanels[i].innerHTML).toEqual(tweets[i].HTML)
      }
    });

  });
});
