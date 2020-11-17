import {Component, OnInit, ViewChild} from '@angular/core';
import {HandData} from '../../../../shared/models/hand-data';
import {MatStepper} from '@angular/material/stepper';
import {ApiService} from '../../../../core/services/api.service';
import {JsonHelperService} from '../../../../core/services/json-helper.service';

@Component({
  selector: 'app-gesture-creation',
  templateUrl: './gesture-creation.component.html',
  styleUrls: ['./gesture-creation.component.css']
})
export class GestureCreationComponent implements OnInit {

  private gestureVisualization: Blob;
  private gestures: Array<HandData>[] = new Array<Array<HandData>>(3);
  private step = 1;
  @ViewChild('stepper')
  private stepper: MatStepper;

  constructor(private apiService: ApiService, private jsonHelperService: JsonHelperService) {
  }

  ngOnInit(): void {
  }

  public onGestureVisualizationSave(event: Blob) {
    this.gestureVisualization = event;
  }

  public onGestureSave(event: Array<HandData>) {
    this.gestures[this.step - 1] = event;
    this.step++;
    this.stepper.next();
    if (this.step === 4) {
      this.saveGestureForUser();
    }
  }

  public checkStep(i) {
    return i === this.step;
  }

  private saveGestureForUser() {
    const formData = new FormData();
    formData.append('gestureVisualization', this.gestureVisualization);
    formData.append('gestures', JSON.stringify(this.gestures, this.jsonHelperService.mapReplacer));
    this.apiService.saveUserGestures(formData).subscribe(() => {
      console.log('success');
    }, () => {
      console.log('error');
    });
  }
}
