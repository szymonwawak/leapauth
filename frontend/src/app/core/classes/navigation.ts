import {Direction} from '../enums/direction.enum';

export abstract class Navigation {

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
}
