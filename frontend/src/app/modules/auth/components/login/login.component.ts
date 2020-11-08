import {Component, OnInit} from '@angular/core';
import {AuthApiService} from '../../../../core/services/auth-api.service';
import {LoginModel} from '../../../../shared/models/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthApiService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginModel).subscribe(
      res => {
        const token: any = res.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      },
      err => {
      });
  }
}
