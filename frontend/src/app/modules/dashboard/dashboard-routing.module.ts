import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardTemplateComponent} from './pages/dashboard-template/dashboard-template.component';
import {GestureCreationComponent} from './components/gesture-creation/gesture-creation.component';

const routes: Routes = [
  {
    path: '', component: DashboardTemplateComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'gesture'},
      {path: 'createGesture', component: GestureCreationComponent},
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
export class DashboardRoutingModule {
}
