import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LeapComponent} from './components/leap/leap.component';
import {AuthTemplateComponent} from './pages/auth-template/auth-template.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthTemplateComponent, children: [
      {path: 'leap', component: LeapComponent},
      {path: 'login', component: LoginComponent}
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
