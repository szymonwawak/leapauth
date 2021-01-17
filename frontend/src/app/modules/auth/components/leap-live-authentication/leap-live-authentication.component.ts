import {Component, ElementRef, OnInit} from '@angular/core';
import * as riggedHand from '../../../../../assets/js/leap.rigged-hand-0.1.7.min';
import {LeapVisualisationInitializerService} from '../../../../core/services/leap-visualisation-initializer.service';
import {LeapLoginModel} from "../../../../shared/models/LeapLoginModel";
import {FrameDataExtractorService} from "../../../../core/services/frame-data-extractor.service";
import {AuthService} from "../../../../core/services/auth.service";
import {HandData} from "../../../../shared/models/hand-data";
import {Router} from "@angular/router";
import {UtilsService} from "../../../../core/services/utils.service";

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
  private frameList: Array<HandData> = new Array<HandData>();
  private blockRequest = false;
  private isAuthRequestPending = false;
  readonly FRAME_SEND_INTERVAL = 2;
  private RECORDING_LENGTH = 200;

  constructor(private elementRef: ElementRef, private authService: AuthService,
              private leapVisualisationInitializerService: LeapVisualisationInitializerService,
              private frameDataExtractorService: FrameDataExtractorService, private router: Router,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.initScene();
    this.initController();
  }

  initScene() {
    this.scene = this.leapVisualisationInitializerService.getScene();
    this.renderer = this.leapVisualisationInitializerService.getRenderer();
    this.camera = this.leapVisualisationInitializerService.getCamera();
    this.leapVisualisationInitializerService.initializeSceneAndAttachToGivenComponent(this.scene, this.camera, this.renderer, this.elementRef.nativeElement);
  }

  private initController(): void {
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
      if (!this.isAuthRequestPending) {
        this.addFrameDataToListAndSaveWhenReady(frame);
      }
    });
  }

  private addFrameDataToListAndSaveWhenReady(frame): void {
    const handData = this.frameDataExtractorService.prepareData(frame);
    this.frameList.push(handData);
    if (this.frameList.length >= this.RECORDING_LENGTH) {
      this.authorize();
    }
  }

  private authorize() {
    const authModel = new LeapLoginModel();
    authModel.email = 'address1@test.com';
    authModel.gesture = this.frameList;
    if (!this.blockRequest) {
      this.isAuthRequestPending = true;
      this.authService.loginWithLeap(authModel).subscribe(
        res => {
          const token: string = res.token;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigateByUrl('/dashboard');
          }
        }, error => {
          this.utilsService.openSnackBar(error.error.message);
          this.ngOnInit();
        }
      );
      this.blockRequest = true;
    }
  }
}
