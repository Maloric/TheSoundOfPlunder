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
    lastMsg: any
  };
  let viewModel: any;
  let pageStateSubject$: ReplaySubject<any>;

  beforeEach(() => {
    mockViewModelData = {
      lastMsg: { some: 'message' }
    };

    pageStateSubject$ = new ReplaySubject<any>();

    viewModel = {
      lastMsg$: pageStateSubject$.map(x => x.lastMg)
    };

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MakeTestComponent('mockLogComponent', 'app-log', ['lastMsg'])
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
});
