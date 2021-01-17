import {Injectable} from '@angular/core';
import {HandData} from '../../shared/models/hand-data';
import {JsonHelperService} from "./json-helper.service";

@Injectable({
  providedIn: 'root'
})
export class FrameDataExtractorService {

  private palmProperties = ['palm-normal-x', 'palm-normal-y', 'palm-normal-z'];
  private handDirection = ['hand-direction-x', 'hand-direction-y', 'hand-direction-z'];
  private fingerTipDistances = ['f1-f2-tip-dist', 'f2-f3-tip-dist', 'f3-f4-tip-dist', 'f4-f5-tip-dist'];
  private fingerDipDistances = ['f1-f2-dip-dist', 'f2-f3-dip-dist', 'f3-f4-dip-dist', 'f4-f5-dip-dist'];
  private fingerToPalmDistances = ['f1-palm-dist', 'f2-palm-dist', 'f3-palm-dist', 'f4-palm-dist', 'f5-palm-dist'];

  constructor(private jsonHelperService: JsonHelperService) {
  }

  public prepareData(frame): HandData {
    const handData = new HandData();
    const hand = frame.hands[0];
    if (hand) {
      handData.handType = hand.type;
      const data = handData.data;
      this.preparePalmData(hand, data);
      this.prepareFingersData(hand, data);
      handData.data = this.jsonHelperService.replaceMapToObject(data);
      return handData;
    }
    return null;
  }

  private preparePalmData(hand, handData: Map<string, number>): void {
    this.extractAndSetVectorData(hand.palmNormal, this.palmProperties, handData);
    this.extractAndSetVectorData(hand.direction, this.handDirection, handData);
  }

  private extractAndSetVectorData(vector: Array<number>, propertiesArray: Array<string>, data: Map<string, number>): void {
    for (let i = 0; i < vector.length; i++) {
      const coordinateName = propertiesArray[i];
      data.set(coordinateName, vector[i]);
    }
  }

  private prepareFingersData(hand, handData: Map<string, number>): void {
    const palmCenter = hand.palmPosition;
    const fingers = hand.fingers;
    for (let i = 0; i < this.fingerToPalmDistances.length; i++) {
      handData.set(this.fingerToPalmDistances[i], this.calculateDistanceBetweenTwoPoints(palmCenter, fingers[i].tipPosition));
    }
    for (let i = 0; i < this.fingerTipDistances.length; i++) {
      handData.set(this.fingerTipDistances[i], this.calculateDistanceBetweenTwoPoints(fingers[i].tipPosition, fingers[i + 1].tipPosition));
      handData.set(this.fingerDipDistances[i], this.calculateDistanceBetweenTwoPoints(fingers[i].dipPosition, fingers[i + 1].dipPosition));
    }
  }

  private calculateDistanceBetweenTwoPoints(pointA: Array<number>, pointB: Array<number>): number {
    const valueBeforeSquareRoot = Math.pow(pointA[0] - pointB[0], 2)
      + Math.pow(pointA[1] - pointB[1], 2)
      + Math.pow(pointA[2] - pointB[2], 2);
    return Math.sqrt(valueBeforeSquareRoot);
  }
}
