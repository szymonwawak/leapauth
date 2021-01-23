import {Component, ElementRef, Injector, OnInit} from '@angular/core';
import {LeapVisualisationInitializerService} from '../../../../core/services/leap-visualisation-initializer.service';
import {ApiService} from '../../../../core/services/api.service';
import {UtilsService} from '../../../../core/services/utils.service';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-gesture-visualization',
  templateUrl: './gesture-visualization.component.html',
  styleUrls: ['./gesture-visualization.component.css']
})
export class GestureVisualizationComponent implements OnInit {

  private userId = 0;
  private controller;
  private player;
  private scene;
  private renderer;
  private camera;

  constructor(private elementRef: ElementRef, private apiService: ApiService,
              private leapVisualisationInitializerService: LeapVisualisationInitializerService,
              private utilsService: UtilsService, private injector: Injector) {
  }

  ngOnInit(): void {
    this.initScene();
    this.initController();
    this.userId = this.injector.get(MAT_DIALOG_DATA, 0);
  }

  public playback(): void {
    this.player.toggle();
  }

  private initController() {
    this.controller = new Leap.Controller();
    this.initLeapPlugins();
    this.loadGestureVisualization();
  }

  private initLeapPlugins() {
    this.controller.use('playback', {
      loop: false,
      pauseHotkey: false,
      pauseOnHand: false
    });
    this.controller.use('riggedHand', {
      parent: this.scene,
      scene: this.scene,
      renderer: this.renderer,
      offset: new THREE.Vector3(0, 0, 0),
      camera: this.camera,
      checkWebGL: true
    }).connect();
    this.player = this.controller.plugins.playback.player;
  }

  private initScene() {
    this.scene = this.leapVisualisationInitializerService.getScene();
    this.renderer = this.leapVisualisationInitializerService.getRenderer();
    this.camera = this.leapVisualisationInitializerService.getCamera();
    this.leapVisualisationInitializerService.initializeSceneAndAttachToGivenComponent(this.scene, this.camera, this.renderer, this.getSceneContainer());
  }

  private getSceneContainer() {
    const nativeElement = this.elementRef.nativeElement;
    return nativeElement.getElementsByClassName('scene-container')[0];
  }

  private loadGestureVisualization(): void {
    this.apiService.getGestureVisualization(this.userId).subscribe(
      res => {
        this.player.setRecording(res);
        const recording = this.player.recording;
        recording.url = 'visualization.json';
        recording.readFileData(JSON.stringify(res));
        this.player.setRecording(recording).play();
      }, error => {
        this.utilsService.openSnackBar(error.error.message);
      }
    );
  }
}
