import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnusedCssNg2Visitor } from 'codelyzer/noUnusedCssRule';
import { MockComponent } from 'ng2-mock-component';
import { ReplaySubject } from 'rxjs/Rx';

import { LogPageComponent } from './log.page';
import { LogViewModel } from './log.viewmodel';

describe('LogPageComponent', () => {
  let component: LogPageComponent;
  let fixture: ComponentFixture<LogPageComponent>;

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
        LogPageComponent,
        MockComponent({ selector: 'app-log', inputs: ['tweets'] })
      ], providers: [
        {
          provide: LogViewModel,
          useValue: viewModel
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogPageComponent);
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

  it('should pass the tweets array to the log component', () => {
    mockViewModelData.tweets = [{
      id: 'tweet1'
    }, {
      id: 'tweet2'
    }];

    refresh();

    const logComponent = fixture.debugElement.query(q => q.name === 'app-log');
    expect(logComponent).toBeDefined();
    expect(logComponent.componentInstance.tweets).toEqual(mockViewModelData.tweets);
  });
});
