import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Direction} from '../enums/direction.enum';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private swipeDirection = new Subject<Direction>();

  public setSwipeDirection(direction: Direction) {
    return this.swipeDirection.next(direction);
  }

  public getSwipeDirection(): Subject<Direction> {
    return this.swipeDirection;
  }
}
