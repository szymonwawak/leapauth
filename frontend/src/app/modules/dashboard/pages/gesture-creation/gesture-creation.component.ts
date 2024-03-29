import {Component, OnInit, ViewChild} from '@angular/core';
import {HandData} from '../../../../shared/models/HandData';
import {MatStepper} from '@angular/material/stepper';
import {ApiService} from '../../../../core/services/api.service';
import {JsonHelperService} from '../../../../core/services/json-helper.service';
import {Gestures} from '../../../../shared/models/Gestures';
import {GestureData} from '../../../../shared/models/GestureData';
import {UtilsService} from '../../../../core/services/utils.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-gesture-creation',
  templateUrl: './gesture-creation.component.html',
  styleUrls: ['./gesture-creation.component.css']
})
export class GestureCreationComponent implements OnInit {

  private gestureVisualization: Blob;
  private readonly gestures: Gestures;
  private step = 1;
  @ViewChild('stepper')
  private stepper: MatStepper;

  constructor(private apiService: ApiService, private jsonHelperService: JsonHelperService,
              private utilsService: UtilsService, private translateService: TranslateService) {
    this.gestures = new Gestures();
  }

  ngOnInit(): void {
  }

  public onGestureVisualizationSave(event: Blob) {
    this.gestureVisualization = event;
  }

  public onGestureSave(event: Array<HandData>) {
    const gestureData = new GestureData();
    gestureData.gesture = event;
    this.gestures.gestures.push(gestureData);
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
    formData.append('gestures', JSON.stringify(this.gestures));
    formData.append('gestureVisualization', this.gestureVisualization);
    this.apiService.saveUserGestures(formData).subscribe(() => {
      this.utilsService.openSnackBar(this.translateService.instant('gesture.save.success'));
    }, err => {
      this.utilsService.openSnackBar(err.error.message);
    });
  }
}
