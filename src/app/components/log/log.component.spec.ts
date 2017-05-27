import { DebugElement } from '@angular/core/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogComponent } from './log.component';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when the tweets property is undefined', () => {
    beforeEach(() => {
      component.tweets = undefined;
      fixture.detectChanges();
    });

    it('should display nothing', () => {
      const dataEl = element.querySelector('pre');
      expect(dataEl).toBeNull();
    });
  });

  describe('when the tweets property contains items', () => {
    const mockData = [{
      id: 'tweet1'
    }, {
      id: 'tweet2'
    }];

    beforeEach(() => {
      component.tweets = mockData;
      fixture.detectChanges();
    });

    it('should display the data in the pre element', () => {
      const dataEl = element.querySelector('pre');
      expect(dataEl.textContent).toEqual(JSON.stringify(mockData, null, 2));
    });

  });
});
