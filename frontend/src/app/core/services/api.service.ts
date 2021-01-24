import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/User';
import {StatsPackVM} from '../../shared/models/StatsPackVM';
import {UserAdminVM} from '../../shared/models/UserAdminVM';
import {SystemProperties} from "../../shared/models/SystemProperties";
import {LeapLoginAttempt} from "../../shared/models/LeapLoginAttempt";
import {Gesture} from "../../shared/models/Gesture";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = 'http://localhost:8080/';
  private BASE_URL = this.URL + 'api';
  private GESTURE_URL = this.BASE_URL + '/gestures/';
  private STATS_URL = this.BASE_URL + '/stats/';
  private ADMIN_URL = this.BASE_URL + '/admin/';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL + 'public/users');
  }

  saveUserGestures(gesturesData): Observable<any> {
    return this.http.post<any>(this.GESTURE_URL + 'saveGestureForCurrentUser', gesturesData);
  }

  getGestureVisualization(userId: number): Observable<any> {
    return this.http.get<any>(this.GESTURE_URL + 'visualization/' + userId);
  }

  getGesture(userId: number) {
    return this.http.get<Gesture>(this.GESTURE_URL + userId);
  }

  getUserStats(userId: number) {
    return this.http.get<StatsPackVM>(this.STATS_URL + userId);
  }

  getUsersForAdminPanel() {
    return this.http.get<Array<UserAdminVM>>(this.ADMIN_URL + 'users');
  }

  addAdminAuthority(id: number) {
    return this.http.post<any>(this.ADMIN_URL + 'addAdminAuthority', id);
  }

  setSystemProperties(systemProperties: SystemProperties) {
    return this.http.post<any>(this.ADMIN_URL + 'setProperties', systemProperties);
  }

  getLeapAttempts() {
    return this.http.get<Array<LeapLoginAttempt>>(this.ADMIN_URL + 'todayLoginAttempts');
  }

  getSystemProperties() {
    return this.http.get<SystemProperties>(this.ADMIN_URL + 'systemProperties');
  }
}
