import { UnusedCssNg2Visitor } from 'codelyzer/noUnusedCssRule';
import { DashboardViewModel } from './dashboard.viewmodel';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/Rx';

import { MakeTestComponent } from '../../helpers/testHelpers';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
        DashboardComponent,
        MakeTestComponent('mockLogComponent', 'app-log', ['tweets']),
        MakeTestComponent('mockFeedComponent', 'app-twitter-feed', ['tweets'])
      ], providers: [
        {
          provide: DashboardViewModel,
          useValue: viewModel
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
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

  it('should pass the tweets array to the log component and twitter-feed component', () => {
    mockViewModelData.tweets = [{
      id: 'tweet1'
    }, {
      id: 'tweet2'
    }];

    refresh();

    const logComponent = fixture.debugElement.query(q => q.name === 'app-log');
    const twitterFeedComponent = fixture.debugElement.query(q => q.name === 'app-twitter-feed');
    expect(logComponent).toBeDefined();
    expect(twitterFeedComponent).toBeDefined();

    expect(logComponent.componentInstance.tweets).toEqual(mockViewModelData.tweets);
    expect(twitterFeedComponent.componentInstance.tweets).toEqual(mockViewModelData.tweets);
  });
});
