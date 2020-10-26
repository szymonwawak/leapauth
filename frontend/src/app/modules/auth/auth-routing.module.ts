import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LeapComponent} from './components/leap/leap.component';
import {AuthTemplateComponent} from './pages/auth-template/auth-template.component';

const routes: Routes = [
  {
    path: '', component: AuthTemplateComponent, children: [
      {path: '', component: LeapComponent}
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
