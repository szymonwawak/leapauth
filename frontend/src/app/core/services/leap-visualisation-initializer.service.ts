import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeapVisualisationInitializerService {

  constructor() {
  }

  public getCamera() {
    return new THREE.PerspectiveCamera(45, 1, 1, 1000);
  }

  public getScene() {
    return new THREE.Scene();
  }

  public getRenderer() {
    return new THREE.WebGLRenderer({alpha: true});
  }

  public initializeSceneAndAttachToGivenComponent(scene, camera, renderer, elementToAttach) {
    this.initRenderer(renderer, scene, camera);
    elementToAttach.appendChild(renderer.domElement);
  }

  private initRenderer(renderer, scene, camera) {
    renderer.setClearColor(0x303030, 1);
    renderer.setSize(800, 700);
    scene.add(new THREE.AmbientLight(0x888888));
    const pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(pointLight);
    camera.position.fromArray([300, 600, 400]);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
    renderer.render(scene, camera);
  }
}
