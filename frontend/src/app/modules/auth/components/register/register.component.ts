import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {RegisterModel} from '../../../../shared/models/RegisterModel';
import {Router} from '@angular/router';
import {UtilsService} from '../../../../core/services/utils.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel;

  constructor(private authService: AuthService, private router: Router, private utilsService: UtilsService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.registerModel = {
      name: '',
      surname: '',
      email: '',
      password: ''
    };
  }

  register(): void {
    this.authService.register(this.registerModel).subscribe(
      res => {
        this.router.navigateByUrl('auth/login');
        this.utilsService.openSnackBar(this.translateService.instant('account.created'));
      },
      err => {
        this.utilsService.openSnackBar(err.error.message);
      });
  }
}
