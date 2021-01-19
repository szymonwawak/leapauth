import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardTemplateComponent} from './pages/dashboard-template/dashboard-template.component';
import {GestureCreationComponent} from './components/gesture-creation/gesture-creation.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {GestureVisualizationComponent} from './components/gesture-visualization/gesture-visualization.component';
import {StatsComponent} from './components/stats/stats.component';

const routes: Routes = [
  {
    path: '', component: DashboardTemplateComponent, canActivate: [AuthGuard], children: [
      {path: '', pathMatch: 'full', redirectTo: 'createGesture'},
      {path: 'createGesture', component: GestureCreationComponent},
      {path: 'showGesture', component: GestureVisualizationComponent},
      {path: 'stats', component: StatsComponent},
      {path: 'logout', redirectTo: '/auth/leap'},
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
