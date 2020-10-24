import {Component, Input, OnInit} from '@angular/core';
import {NavigatorConfig} from '../../models/navigator-config';
import {NavigationService} from '../../../core/services/navigation.service';
import {Direction} from '../../../core/enums/direction.enum';
import {Subject} from "rxjs";
import {ServiceInjector} from "../../../core/classes/service-injector";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  public config: NavigatorConfig = {top: '', right: '', down: '', left: ''};
  private configObservable: Subject<NavigatorConfig>;
  private navigationService: NavigationService;

  constructor() {
    this.navigationService = ServiceInjector.injector.get(NavigationService);
    this.configObservable = this.navigationService.getConfig();
  }

  ngOnInit(): void {
    this.initController();
    this.initNavigationService();
  }

  private initController() {
    const controller = Leap.loop({enableGestures: true}, () => {
    });
    controller.on('gesture', (gesture) => {
      if (gesture.type === 'swipe') {
        const direction = this.getSwipeDirection(gesture);
        this.navigationService.setSwipeDirection(direction);
      }
    });
  }

  private initNavigationService(): void {
    this.configObservable.subscribe((config) => {
      this.config = config;
    });
  }

  private getSwipeDirection(gesture: any): Direction {
    const direction = gesture.direction;
    const isHorizontal = Math.abs(direction[0]) > Math.abs(direction[1]);
    if (isHorizontal) {
      return direction[0] > 0 ? Direction.Right : Direction.Left;
    } else {
      return direction[1] > 0 ? Direction.Up : Direction.Down;
    }
  }
}
