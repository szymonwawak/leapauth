import {Component, ElementRef, OnInit} from '@angular/core';
import {FrameDataExtractorService} from '../../../../core/services/frame-data-extractor.service';
import {LeapVisualisationInitializerService} from '../../../../core/services/leap-visualisation-initializer.service';

@Component({
  selector: 'app-gesture-creation',
  templateUrl: './gesture-save.component.html',
  styleUrls: ['./gesture-save.component.css']
})
export class GestureSaveComponent implements OnInit {

  public leftValue = 0;
  public rightValue = 0;
  private frameArray = [];
  private croppedFrameArray = [];
  private lastFrame;
  private isRecording = true;
  private controller;
  private player;
  private scene;
  private renderer;
  private camera;

  constructor(private elementRef: ElementRef, private frameDataExtractorService: FrameDataExtractorService,
              private leapVisualisationInitializerService: LeapVisualisationInitializerService) {
  }

  ngOnInit(): void {
    this.initScene();
    this.initController();
  }

  private initController() {
    this.controller = new Leap.Controller();
    this.initLeapPlugins();
    this.setRecordingListeners();
  }

  private setRecordingListeners() {
    this.controller.on('playback.recordingFinished', () => {
      const recordingLength = this.recordingLength();
      this.isRecording = false;
      this.rightValue = recordingLength;
      this.lastFrame = recordingLength;
      if (this.player.loaded()) {
        this.player.idle();
        return this.playback();
      }
    });
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

  initScene() {
    this.scene = this.leapVisualisationInitializerService.getScene();
    this.renderer = this.leapVisualisationInitializerService.getRenderer();
    this.camera = this.leapVisualisationInitializerService.getCamera();
    this.leapVisualisationInitializerService.initializeSceneAndAttachToGivenComponent(this.scene, this.camera, this.renderer, this.getSceneContainer());
  }

  public getOptions() {
    return {
      floor: 0,
      ceil: this.recordingLength()
    };
  }

  private getSceneContainer() {
    const nativeElement = this.elementRef.nativeElement;
    return nativeElement.getElementsByClassName('scene-container')[0];
  }

  public record(): void {
    if (this.player.state === 'recording') {
      if (this.player.recordPending()) {
        this.player.stop();
      } else {
        this.player.finishRecording();
      }
    } else {
      this.player.record();
      this.isRecording = true;
      this.frameArray = [];
      this.controller.on('frame', (frame) => {
        this.registerFrameData(frame);
      });
    }
  }

  private registerFrameData(frame) {
    if (this.player.state === 'recording' && frame.hands.length > 0) {
      this.frameArray.push(this.frameDataExtractorService.prepareData(frame));
    }
  }

  public playback(): void {
    this.player.toggle();
  }

  public save(): void {
    this.trimRecordedFramesDataToCroppedRecording();
    let frameCounter = 0;
    const filteredArray = this.croppedFrameArray.filter(() => {
      frameCounter++;
      if (frameCounter === 6) {
        frameCounter = 0;
        return true;
      }
      return false;
    });
    const file = this.player.recording.save('json');
  }

  private trimRecordedFramesDataToCroppedRecording() {
    const recording = this.player.recording;
    const diffBetweenBoundaryFrames = recording.rightCropPosition - recording.leftCropPosition;
    const animationLength = this.getFrameByProportionFromGivenPoints(diffBetweenBoundaryFrames, this.lastFrame);
    const lastFrameIndex = this.getFrameByProportionFromGivenPoints(recording.rightCropPosition, this.lastFrame);
    const firstFrameIndex = lastFrameIndex - animationLength;
    this.croppedFrameArray = this.frameArray.slice(firstFrameIndex, lastFrameIndex);
  }

  private getFrameByProportionFromGivenPoints(from: number, to: number) {
    const proportion = from / to;
    return this.frameArray.length * proportion;
  }

  public setCurrentFrame(): void {
    const recording = this.player.recording;
    if (recording.leftCropPosition !== this.leftValue) {
      this.player.setFrameIndex(this.leftValue);
    } else if (recording.rightCropPosition !== this.rightValue) {
      this.player.setFrameIndex(this.rightValue);
    }
    recording.leftCropPosition = this.leftValue;
    recording.rightCropPosition = this.rightValue;
    this.player.sendFrame(this.player.recording.currentFrame());
  }

  public recordingLength(): number {
    if (this.player && this.player.recording) {
      return this.player.recording.frameCount;
    }
    return 0;
  }
}
