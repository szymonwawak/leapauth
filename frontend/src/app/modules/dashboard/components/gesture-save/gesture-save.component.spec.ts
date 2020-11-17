import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestureSaveComponent} from './gesture-save.component';

describe('GestureCreationComponent', () => {
  let component: GestureSaveComponent;
  let fixture: ComponentFixture<GestureSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestureSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestureSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
