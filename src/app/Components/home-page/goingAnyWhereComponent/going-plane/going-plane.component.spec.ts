import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoingPlaneComponent } from './going-plane.component';

describe('GoingPlaneComponent', () => {
  let component: GoingPlaneComponent;
  let fixture: ComponentFixture<GoingPlaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoingPlaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoingPlaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
