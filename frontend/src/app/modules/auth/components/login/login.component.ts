import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {LoginModel} from '../../../../shared/models/LoginModel';
import {NavigableBase} from '../../../../core/classes/navigable-base';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends NavigableBase implements OnInit {
  loginModel: LoginModel = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginModel).subscribe(
      res => {
        const token: string = res.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/dashboard');
        }
      },
      err => {
        console.error('Login failed');
      });
  }

  down(): void {
  }

  left(): void {
  }

  right(): void {
  }

  top(): void {
  }
}
