import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeSystemPropertiesComponent} from './change-system-properties.component';

describe('ChangeSystemPropertiesComponent', () => {
  let component: ChangeSystemPropertiesComponent;
  let fixture: ComponentFixture<ChangeSystemPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSystemPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSystemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
