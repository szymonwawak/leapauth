import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardTemplateComponent} from './pages/dashboard-template/dashboard-template.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {StatsComponent} from './components/stats/stats.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {GestureCreationComponent} from './pages/gesture-creation/gesture-creation.component';
import {GestureVisualizationComponent} from './pages/gesture-visualization/gesture-visualization.component';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import {AdminGuard} from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '', component: DashboardTemplateComponent, canActivate: [AuthGuard], children: [
      {path: '', pathMatch: 'full', redirectTo: 'show-gesture'},
      {path: 'create-gesture', component: GestureCreationComponent},
      {path: 'show-gesture', component: GestureVisualizationComponent},
      {path: 'user-list', component: UserListComponent, canActivate: [AdminGuard]},
      {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
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
