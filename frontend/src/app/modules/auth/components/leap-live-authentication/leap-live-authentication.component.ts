import {Component, ElementRef, OnInit} from '@angular/core';
import * as riggedHand from '../../../../../assets/js/leap.rigged-hand-0.1.7.min';
import {LeapSocketService} from '../../../../core/services/leap-socket.service';
import {LeapVisualisationInitializerService} from '../../../../core/services/leap-visualisation-initializer.service';

@Component({
  selector: 'app-leap-live-authentication',
  templateUrl: './leap-live-authentication.component.html',
  styleUrls: ['./leap-live-authentication.component.css']
})
export class LeapLiveAuthenticationComponent implements OnInit {
  private controller;
  private scene;
  private renderer;
  private camera;
  private frameCounter = 0;
  private frameIdentifier = 0;
  readonly frameSendInterval = 6;

  constructor(private leapSocketService: LeapSocketService, private elementRef: ElementRef,
              private leapVisualisationInitializerService: LeapVisualisationInitializerService) {
  }

  ngOnInit(): void {
    this.initScene();
    this.leapSocketService.initWebSocketConnection();
    this.initController();
  }

  initScene() {
    this.scene = this.leapVisualisationInitializerService.getScene();
    this.renderer = this.leapVisualisationInitializerService.getRenderer();
    this.camera = this.leapVisualisationInitializerService.getCamera();
    this.leapVisualisationInitializerService.initializeSceneAndAttachToGivenComponent(this.scene, this.camera, this.renderer, this.elementRef);
  }

  private initController() {
    this.controller = new Leap.Controller();
    this.controller.use('riggedHand', {
      parent: this.scene,
      scene: this.scene,
      renderer: this.renderer,
      offset: new THREE.Vector3(0, 0, 0),
      camera: this.camera,
      checkWebGL: true
    }).connect();
    this.controller.on('frame', (frame) => {
      this.frameCounter++;
      if (this.shouldSendFrame()) {
        this.leapSocketService.prepareAndSendFrameData(frame, this.frameIdentifier);
        this.frameCounter = 0;
        this.frameIdentifier++;
      }
    });
  }

  private shouldSendFrame(): boolean {
    return this.frameCounter === this.frameSendInterval;
  }
}
