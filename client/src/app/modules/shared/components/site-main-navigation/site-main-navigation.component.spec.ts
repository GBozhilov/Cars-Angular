import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMainNavigationComponent } from './site-main-navigation.component';

describe('SiteMainNavigationComponent', () => {
  let component: SiteMainNavigationComponent;
  let fixture: ComponentFixture<SiteMainNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteMainNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteMainNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
