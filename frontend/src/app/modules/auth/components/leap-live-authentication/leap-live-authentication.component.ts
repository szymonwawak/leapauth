import {Component, ElementRef, Input, OnInit} from '@angular/core';
import * as riggedHand from '../../../../../assets/js/leap.rigged-hand-0.1.7.min';
import {LeapVisualisationInitializerService} from '../../../../core/services/leap-visualisation-initializer.service';
import {LeapLoginModel} from "../../../../shared/models/LeapLoginModel";
import {FrameDataExtractorService} from "../../../../core/services/frame-data-extractor.service";
import {AuthService} from "../../../../core/services/auth.service";
import {HandData} from "../../../../shared/models/hand-data";
import {Router} from "@angular/router";
import {UtilsService} from "../../../../core/services/utils.service";
import {User} from "../../../../shared/models/User";

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
  private isAuthRequestPending = false;
  private errorCounter = 0;

  @Input()
  private selectedUser: User;
  readonly FRAME_SEND_INTERVAL = 2;
  private RECORDING_LENGTH = 240;

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
    const sceneContainer = this.elementRef.nativeElement;
    if (sceneContainer.firstChild) {
      sceneContainer.firstChild.remove();
    }
    this.leapVisualisationInitializerService.initializeSceneAndAttachToGivenComponent(this.scene, this.camera, this.renderer, sceneContainer);
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
    if (handData) {
      this.frameList.push(handData);
    }
    if (this.frameList.length >= this.RECORDING_LENGTH) {
      this.authorize();
    }
  }

  private authorize(): void {
    const authModel = new LeapLoginModel();
    authModel.email = this.selectedUser.email;
    authModel.gesture = this.frameList;
    if (!this.isAuthRequestPending) {
      this.isAuthRequestPending = true;
      this.authService.loginWithLeap(authModel).subscribe(
        res => {
          const token: string = res.token;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigateByUrl('/dashboard');
          }
        }, error => {
          this.handleError(error);
        },
      ).add(
        () => {
          this.frameList = new Array<HandData>();
          this.isAuthRequestPending = false;
        }
      );
    }
  }

  private handleError(error): void {
    this.errorCounter++;
    if (this.errorCounter > 3) {
      location.reload();
    }
    this.utilsService.openSnackBar(error.error.message);
  }
}
