import {Injectable} from '@angular/core';
import {UUID} from 'angular2-uuid';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {HandData} from '../../shared/models/hand-data';
import {FrameDataExtractorService} from './frame-data-extractor.service';

@Injectable({
  providedIn: 'root'
})
export class LeapSocketService {
  private socket;
  private stompClient;
  private connectionId: string;

  constructor(private frameDataExtractorService: FrameDataExtractorService) {
  }

  public initWebSocketConnection(): void {
    this.connectionId = UUID.UUID();
    this.socket = new SockJS('http://localhost:8080/auth');
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/queue/users/authorize/' + this.connectionId, (msgOut) => {
        console.log(msgOut);
      });
    });
  }

  public prepareAndSendFrameData(frame, frameIdentifier: number): void {
    const handData = this.frameDataExtractorService.prepareData(frame);
    handData.frameIdentifier = frameIdentifier;
    this.sendFrameData(handData);
  }

  private sendFrameData(handData: HandData): void {
    // this.stompClient.send('/leap/authorize/' + this.connectionId, {}, '');
  }
}
