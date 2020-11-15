import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapLiveAuthenticationComponent } from './leap-live-authentication.component';

describe('LeapLiveAuthenticationComponent', () => {
  let component: LeapLiveAuthenticationComponent;
  let fixture: ComponentFixture<LeapLiveAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapLiveAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeapLiveAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
