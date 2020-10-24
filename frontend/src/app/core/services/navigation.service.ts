import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Direction} from '../enums/direction.enum';
import {NavigatorConfig} from '../../shared/models/navigator-config';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private swipeDirection = new Subject<Direction>();
  private config = new Subject<NavigatorConfig>();

  public setSwipeDirection(direction: Direction): void {
    this.swipeDirection.next(direction);
  }

  public getSwipeDirection(): Subject<Direction> {
    return this.swipeDirection;
  }

  public setConfig(navConfig: NavigatorConfig): void {
    this.config.next(navConfig);
  }

  public getConfig(): Subject<NavigatorConfig> {
    return this.config;
  }
}
