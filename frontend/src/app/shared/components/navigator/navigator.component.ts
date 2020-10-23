import {Component, Input, OnInit} from '@angular/core';
import {NavigatorConfig} from '../../models/navigator-config';
import {NavigationService} from '../../../core/services/navigation.service';
import {Direction} from '../../../core/enums/direction.enum';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  @Input()
  public config: NavigatorConfig;


  constructor(private navigationService: NavigationService) {

  }

  ngOnInit(): void {
    const controller = Leap.loop({enableGestures: true}, () => {});
    controller.on('gesture', (gesture) => {
      if (gesture.type === 'swipe') {
        const direction = this.getSwipeDirection(gesture);
        this.navigationService.setSwipeDirection(direction);
      }
    });
  }

  getSwipeDirection(gesture: any): Direction {
    const direction = gesture.direction;
    const isHorizontal = Math.abs(direction[0]) > Math.abs(direction[1]);
    if (isHorizontal) {
      return direction[0] > 0 ? Direction.Right : Direction.Left;
    } else {
      return direction[1] > 0 ? Direction.Up : Direction.Down;
    }
  }
}
