import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../../shared/models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private AUTH_URL = environment.url + '/auth';

  constructor(private http: HttpClient) {
  }

  login(loginModel: LoginModel) {
    return this.http.post<any>(this.AUTH_URL + '/login', loginModel);
  }
}
