import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/auth.service';
import {RegisterModel} from '../../../../shared/models/RegisterModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel;

  constructor(private authService: AuthService, private router: Router) {
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
        console.log('Account has been created');
        this.router.navigateByUrl('auth/login');
      },
      err => {
        console.error('Registration failed');
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
