import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestureCreationComponent} from './gesture-creation.component';

describe('GestureCreationComponent', () => {
  let component: GestureCreationComponent;
  let fixture: ComponentFixture<GestureCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestureCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestureCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
