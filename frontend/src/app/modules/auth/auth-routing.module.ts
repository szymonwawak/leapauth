import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LeapComponent} from './components/leap/leap.component';
import {AuthTemplateComponent} from './pages/auth-template/auth-template.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {IsAuthenticatedGuard} from '../../core/guards/is-authenticated.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/leap'},
  {
    path: 'auth', component: AuthTemplateComponent, canActivate: [IsAuthenticatedGuard], children: [
      {path: 'leap', component: LeapComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
