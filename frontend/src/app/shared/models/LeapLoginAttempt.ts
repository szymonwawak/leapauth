import {User} from './User';

export class LeapLoginAttempt {
  success: boolean;
  date: Date;
  gestureDifference: number;
  user: User;
}
