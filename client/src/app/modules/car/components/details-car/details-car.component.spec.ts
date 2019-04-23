import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCarComponent } from './details-car.component';

describe('DetailsCarComponent', () => {
  let component: DetailsCarComponent;
  let fixture: ComponentFixture<DetailsCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
