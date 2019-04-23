import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentComponent } from './create-rent.component';

describe('CreateRentComponent', () => {
  let component: CreateRentComponent;
  let fixture: ComponentFixture<CreateRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
