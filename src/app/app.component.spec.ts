import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng2-mock-component';

import { AppComponent } from 'app/app.component';
import { MakeTestComponent } from 'app/helpers/testHelpers';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: any;
  let mockStore: any;
  beforeEach(() => {
    mockStore = { dispatch: jasmine.createSpy('dispatch') };
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-start' })
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: Store, useValue: mockStore }
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
});
