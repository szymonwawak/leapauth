import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {LoginVM} from '../../../../shared/models/LoginVM';
import {Router} from "@angular/router";
import {UtilsService} from "../../../../core/services/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  loginModel: LoginVM = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.loginModel).subscribe(
      res => {
        const token: string = res.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/dashboard/show-gesture');
        }
      },
      err => {
        this.utilsService.openSnackBar(err.error.message);
      });
  }
}
