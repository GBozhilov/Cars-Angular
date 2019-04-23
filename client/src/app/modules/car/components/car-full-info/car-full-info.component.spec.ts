import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFullInfoComponent } from './car-full-info.component';

describe('CarFullInfoComponent', () => {
  let component: CarFullInfoComponent;
  let fixture: ComponentFixture<CarFullInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarFullInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
