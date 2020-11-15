import {NavigationService} from '../services/navigation.service';
import {Subject} from 'rxjs';
import {Direction} from '../enums/direction.enum';
import {ServiceInjector} from './service-injector';
import {NavigatorConfig} from '../../shared/models/navigator-config';

export abstract class NavigableBase {
  protected id: string;
  protected navigationService: NavigationService;
  protected swipeDirectionObservable: Subject<Direction>;

  protected constructor() {
    this.navigationService = ServiceInjector.injector.get(NavigationService);
    this.swipeDirectionObservable = this.navigationService.getSwipeDirection();
  }

  abstract top(): void;

  abstract right(): void;

  abstract left(): void;

  abstract down(): void;

  doAction(direction: Direction): void {
    switch (direction) {
      case Direction.Up:
        this.top();
        break;
      case Direction.Right:
        this.right();
        break;
      case Direction.Down:
        this.down();
        break;
      case Direction.Left:
        this.left();
        break;
    }
  }

  initNavigator(config: NavigatorConfig) {
    this.applyNavigatorConfig(config);
    this.subscribeToNavService();
  }

  applyNavigatorConfig(config: NavigatorConfig): void {
    this.navigationService.setConfig(config);
  }

  subscribeToNavService(): void {
    this.swipeDirectionObservable.subscribe((direction) => {
        this.doAction(direction);
      }
    );
  }

  unsubscribeNavService(): void {
    this.swipeDirectionObservable.unsubscribe();
  }

  setNavHidden(hidden: boolean) {
    this.navigationService.setHidden(hidden);
  }
}
