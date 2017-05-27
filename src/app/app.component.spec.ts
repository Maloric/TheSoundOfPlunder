import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AppComponent } from 'app/app.component';
import { DashboardComponent } from 'app/pages/dashboard';
import { MakeTestComponent } from 'app/helpers/testHelpers';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MakeTestComponent('mockDashboard', 'app-dashboard')
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
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
});
