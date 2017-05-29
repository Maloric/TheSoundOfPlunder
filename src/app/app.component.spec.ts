import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from 'app/app.component';
import { MakeTestComponent } from 'app/helpers/testHelpers';
import { SignalRService } from 'app/services/signalr/signalrService';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: any;

  let mockSignalRService: any;

  beforeEach(() => {
    mockSignalRService = jasmine.createSpyObj('mockSignalRService', ['start'])
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: SignalRService, useValue: mockSignalRService }
      ],
      imports: [
        RouterTestingModule
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

  it('should call start on the signalR service', () => {
    expect(mockSignalRService.start).toHaveBeenCalledTimes(1);
  });
});
