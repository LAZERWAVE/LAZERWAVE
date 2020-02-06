import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoingHotelComponent } from './going-hotel.component';

describe('GoingHotelComponent', () => {
  let component: GoingHotelComponent;
  let fixture: ComponentFixture<GoingHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoingHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoingHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
