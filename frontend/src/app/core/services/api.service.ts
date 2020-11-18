import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:8080';
  private USERS_URL = this.BASE_URL + '/users';
  private GESTURE_URL = this.BASE_URL + '/gestures';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USERS_URL);
  }

  saveUserGestures(gesturesData): Observable<any> {
    return this.http.post<any>(this.GESTURE_URL + '/saveGestureForCurrentUser', gesturesData);
  }
}
