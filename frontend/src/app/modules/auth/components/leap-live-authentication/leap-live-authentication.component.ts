import {Component, ElementRef, OnInit} from '@angular/core';
import * as riggedHand from '../../../../../assets/js/leap.rigged-hand-0.1.7.min';
import * as leapPlugins from '../../../../../assets/js/leap-plugins-0.1.12';
import {LeapSocketService} from '../../../../core/services/leap-socket.service';

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

  constructor(private leapSocketService: LeapSocketService, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initPlugins();
    this.initScene();
    this.leapSocketService.initWebSocketConnection();
    this.initController();
  }

  private initPlugins() {
    window.riggedHand = riggedHand;
    window.leapPlugins = leapPlugins;
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setClearColor(0xEEEEEE, 1);
    this.renderer.setSize(800, 800);
    this.scene.add(new THREE.AmbientLight(0x888888));
    const pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(pointLight);
    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    this.camera.position.fromArray([300, 600, 400]);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.scene.add(this.camera);
    this.renderer.render();
    const componentElement = this.elementRef.nativeElement;
    componentElement.appendChild(this.renderer.domElement);
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
