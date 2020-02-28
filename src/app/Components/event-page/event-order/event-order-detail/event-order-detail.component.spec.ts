import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrderDetailComponent } from './event-order-detail.component';

describe('EventOrderDetailComponent', () => {
  let component: EventOrderDetailComponent;
  let fixture: ComponentFixture<EventOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
