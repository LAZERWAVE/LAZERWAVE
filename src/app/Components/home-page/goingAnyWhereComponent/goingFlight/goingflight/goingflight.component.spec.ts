import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoingflightComponent } from './goingflight.component';

describe('GoingflightComponent', () => {
  let component: GoingflightComponent;
  let fixture: ComponentFixture<GoingflightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoingflightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoingflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
