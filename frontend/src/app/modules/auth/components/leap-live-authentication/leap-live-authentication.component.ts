import {Component, ElementRef, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import * as riggedHand from '../../../../../assets/js/leap.rigged-hand-0.1.7.min';
import * as leapPlugins from '../../../../../assets/js/leap-plugins-0.1.12';

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

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initPlugins();
    this.initScene();
    this.initController();

    // const uuid = UUID.UUID();
    // const socket = new SockJS('http://localhost:8080/auth');
    // const stompClient = Stomp.over(socket);
    // stompClient.connect({}, (frame) => {
    //   stompClient.subscribe('/queue/users/authorize/' + uuid, (msgOut) => {
    //     console.log(msgOut);
    //   });
    //   stompClient.send('/leap/authorize/' + uuid, {}, 'test');
    // });
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
  }
}
