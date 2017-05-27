import { SignalRService } from './services/signalr/signalrService';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AppComponent } from 'app/app.component';
import { DashboardComponent } from 'app/pages/dashboard';
import { MakeTestComponent } from 'app/helpers/testHelpers';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: any;

  let mockSignalRService: any;

  beforeEach(() => {
    mockSignalRService = jasmine.createSpyObj('mockSignalRService', ['start'])
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MakeTestComponent('mockDashboard', 'app-dashboard')
      ],
      providers: [
        { provide: SignalRService, useValue: mockSignalRService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });
  afterEach(() => {

  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    expect(component.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    expect(element.querySelector('h1').textContent).toContain('app works!');
  }));

  it('should call start on the signalR service', () => {
    expect(mockSignalRService.start).toHaveBeenCalledTimes(1);
  });
});
