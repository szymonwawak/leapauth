import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestureVisualizationComponent} from './gesture-visualization.component';

describe('GestureVisualizationComponent', () => {
  let component: GestureVisualizationComponent;
  let fixture: ComponentFixture<GestureVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestureVisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestureVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
