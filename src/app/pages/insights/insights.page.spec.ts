import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnusedCssNg2Visitor } from 'codelyzer/noUnusedCssRule';
import { MockComponent } from 'ng2-mock-component';
import { ReplaySubject } from 'rxjs/Rx';

import { InsightsPageComponent } from './insights.page';
import { InsightsViewModel } from './insights.viewmodel';

describe('InsightsPageComponent', () => {
  let component: InsightsPageComponent;
  let fixture: ComponentFixture<InsightsPageComponent>;

  let mockViewModelData: {
    hashtags: { [key: string]: number }
  };
  let viewModel: any;
  let pageStateSubject$: ReplaySubject<any>;

  beforeEach(() => {
    mockViewModelData = {
      hashtags: {
        popular: 102,
        notSoMuch: 3
      }
    };

    pageStateSubject$ = new ReplaySubject<any>();

    viewModel = {
      hashtags$: pageStateSubject$.map(x => x.hashtags)
    };

    TestBed.configureTestingModule({
      declarations: [
        InsightsPageComponent,
        MockComponent({ selector: 'app-insights', inputs: ['hashtags'] })
      ], providers: [
        {
          provide: InsightsViewModel,
          useValue: viewModel
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsPageComponent);
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

  it('should pass the hashtags array to the insights component', () => {
    mockViewModelData.hashtags = {
      popularHashTag: 57,
      lessPopular: 12
    };

    refresh();

    const insightsComponent = fixture.debugElement.query(q => q.name === 'app-insights');
    expect(insightsComponent).toBeDefined();
    expect(insightsComponent.componentInstance.hashtags).toEqual(mockViewModelData.hashtags);
  });
});
