import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginVM} from '../../shared/models/LoginVM';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RegisterVM} from '../../shared/models/RegisterVM';
import {LeapLoginVM} from '../../shared/models/LeapLoginVM';
import {PasswordChangeVM} from '../../shared/models/PasswordChangeVM';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL = environment.url + '/auth';

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
  }

  login(loginModel: LoginVM) {
    return this.http.post<any>(this.AUTH_URL + '/login', loginModel);
  }

  loginWithLeap(leapLoginModel: LeapLoginVM) {
    return this.http.post<any>(this.AUTH_URL + '/leapLogin', leapLoginModel);
  }

  register(registerModel: RegisterVM) {
    return this.http.post<any>(this.AUTH_URL + '/register', registerModel);
  }

  changePassword(passwordChangeModel: PasswordChangeVM) {
    return this.http.post<any>(this.AUTH_URL + '/changePassword', passwordChangeModel);
  }

  isLoggedIn() {
    const token = this.getJwtToken();
    return !this.jwtHelperService.isTokenExpired(token);
  }

  getJwtToken() {
    return localStorage.getItem('token');
  }
}
