import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Direction} from '../enums/direction.enum';
import {NavigatorConfig} from '../../shared/models/NavigatorConfig';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private swipeDirection = new Subject<Direction>();
  private config = new Subject<NavigatorConfig>();
  private hidden = new Subject<boolean>();

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

  public setHidden(hidden: boolean): void {
    this.hidden.next(hidden);
  }

  public getHidden(): Subject<boolean> {
    return this.hidden;
  }
}
