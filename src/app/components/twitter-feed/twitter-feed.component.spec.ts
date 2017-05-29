import { DebugElement } from '@angular/core/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TwitterFeedComponent } from './twitter-feed.component';

describe('TwitterFeedComponent', () => {
  let component: TwitterFeedComponent;
  let fixture: ComponentFixture<TwitterFeedComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterFeedComponent],
      imports: [RouterTestingModule]
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

  describe('when there are tweets', () => {
    let tweets: any[];
    let tweetPanels: any[];
    beforeEach(() => {
      tweets = [
        {
          this: 'thing1',
          html: '<div>test1</div>'
        },
        {
          this: 'thing2',
          html: '<div><strong>test2</strong></div>'
        },
        {
          this: 'thing3',
          html: '<div><strong>test3</strong></div>'
        },
        {
          this: 'thing4',
          html: '<div><strong>test4</strong></div>'
        },
        {
          this: 'thing5',
          html: '<div><strong>test5</strong></div>'
        }
      ];
      component.tweets = tweets;
      fixture.detectChanges();
      tweetPanels = element.querySelectorAll('.tweet');
    })

    it('should not display a placeholder', () => {
      expect(element.textContent).not.toMatch(/Waiting for Twitter stream.../);
    });

    it('should display one panel for each tweet (in reverse order)', () => {
      expect(tweetPanels.length).toEqual(tweets.length);
      for (let i = 0; i < tweets.length; i++) {
        expect(tweetPanels[tweets.length - i - 1].innerHTML).toEqual(tweets[i].html)
      }
    });

  });
});
