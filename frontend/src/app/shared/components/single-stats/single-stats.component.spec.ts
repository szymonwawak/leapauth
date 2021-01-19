import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleStatsComponent} from './single-stats.component';

describe('SingleStatsComponent', () => {
  let component: SingleStatsComponent;
  let fixture: ComponentFixture<SingleStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
