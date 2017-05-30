import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';
import { SignalRService } from 'app/services/signalr/signalrService';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let element: any;

  let mockSignalRService: any;

  beforeEach(async(() => {
    mockSignalRService = jasmine.createSpyObj('mockSignalRService', ['start']);
    TestBed.configureTestingModule({
      declarations: [StartComponent],
      providers: [
        { provide: SignalRService, useValue: mockSignalRService }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('when the search button is clicked', () => {
  //   let mockSearchTerms = 'test, test2';
  //   beforeEach(() => {
  //     element.querySelector('.searchTerms').value = mockSearchTerms;
  //     element.querySelector('button').click();
  //   });
  //   it('should call start on the signalR service', () => {
  //     expect(mockSignalRService.start).toHaveBeenCalledTimes(1);
  //     expect(mockSignalRService.start).toHaveBeenCalledWith(mockSearchTerms);
  //   });
  // });
});
