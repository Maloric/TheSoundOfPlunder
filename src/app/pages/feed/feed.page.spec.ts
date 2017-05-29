import { UnusedCssNg2Visitor } from 'codelyzer/noUnusedCssRule';
import { FeedViewModel } from './feed.viewmodel';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/Rx';

import { MakeTestComponent } from '../../helpers/testHelpers';

import { FeedPageComponent } from './feed.page';

describe('FeedPageComponent', () => {
  let component: FeedPageComponent;
  let fixture: ComponentFixture<FeedPageComponent>;

  let mockViewModelData: {
    tweets: any
  };
  let viewModel: any;
  let pageStateSubject$: ReplaySubject<any>;

  beforeEach(() => {
    mockViewModelData = {
      tweets: { some: 'message' }
    };

    pageStateSubject$ = new ReplaySubject<any>();

    viewModel = {
      tweets$: pageStateSubject$.map(x => x.tweets)
    };

    TestBed.configureTestingModule({
      declarations: [
        FeedPageComponent,
        MakeTestComponent('mockFeedComponent', 'app-twitter-feed', ['tweets'])
      ], providers: [
        {
          provide: FeedViewModel,
          useValue: viewModel
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function refresh() {
    pageStateSubject$.next(mockViewModelData);
    fixture.detectChanges();
  }

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the tweets array to the twitter-feed component', () => {
    mockViewModelData.tweets = [{
      id: 'tweet1'
    }, {
      id: 'tweet2'
    }];

    refresh();

    const twitterFeedComponent = fixture.debugElement.query(q => q.name === 'app-twitter-feed');
    expect(twitterFeedComponent).toBeDefined();
    expect(twitterFeedComponent.componentInstance.tweets).toEqual(mockViewModelData.tweets);
  });
});
