import { SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsComponent } from './insights.component';

describe('InsightsComponent', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;
  let element: any;
  let mockData = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
    eigth: 8,
    ninth: 9,
    tenth: 10,
    eleventh: 11,
    twelfth: 12
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsightsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();

    component.hashtags = mockData;
    component.ngOnChanges({ prop1: new SimpleChange(undefined, mockData, true) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the hashtags in a pre element', () => {
    expect(fixture.nativeElement.querySelector('pre').textContent).toEqual(JSON.stringify(mockData, null, 2));
  });

  it('should display a chart with up to ten bars - one per hashtag', () => {
    let keys = Object.keys(mockData);
    let bars = element.querySelectorAll('.bar');
    expect(bars.length).toEqual(10);

    for (let i = 0; i < 10; i++) {
      expect(bars[i].textContent).toEqual(`#${keys[i]} (${mockData[keys[i]]})`);
    }
  });
});
