import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsComponent } from './insights.component';

describe('InsightsComponent', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;
  let mockData = {
    popularHashTag: 57,
    lessPopular: 12
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsightsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.hashtags = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the hashtags in a pre element', () => {
    expect(fixture.nativeElement.querySelector('pre').textContent).toEqual(JSON.stringify(mockData, null, 2));
  });
});
