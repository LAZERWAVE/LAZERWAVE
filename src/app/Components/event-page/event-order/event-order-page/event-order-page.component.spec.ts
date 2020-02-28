import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrderPageComponent } from './event-order-page.component';

describe('EventOrderPageComponent', () => {
  let component: EventOrderPageComponent;
  let fixture: ComponentFixture<EventOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
