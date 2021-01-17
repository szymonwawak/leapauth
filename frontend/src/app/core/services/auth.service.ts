import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../../shared/models/LoginModel';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LeapLoginModel} from '../../shared/models/LeapLoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL = environment.url + '/auth';

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
  }

  login(loginModel: LoginModel) {
    return this.http.post<any>(this.AUTH_URL + '/login', loginModel);
  }

  loginWithLeap(leapLoginModel: LeapLoginModel) {
    return this.http.post<any>(this.AUTH_URL + '/leapLogin', leapLoginModel);
  }

  isLoggedIn() {
    const token = this.getJwtToken();
    return !this.jwtHelperService.isTokenExpired(token);
  }

  getJwtToken() {
    return localStorage.getItem('token');
  }
}
