import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoingCarComponent } from './going-car.component';

describe('GoingCarComponent', () => {
  let component: GoingCarComponent;
  let fixture: ComponentFixture<GoingCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoingCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
