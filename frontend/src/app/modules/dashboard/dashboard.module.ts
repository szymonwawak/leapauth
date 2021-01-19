import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardTemplateComponent} from './pages/dashboard-template/dashboard-template.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {ServiceInjector, services} from '../../core/classes/service-injector';
import {HttpClient} from '@angular/common/http';
import {httpTranslateLoader} from '../auth/auth.module';
import {GestureSaveComponent} from './components/gesture-save/gesture-save.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {GestureCreationComponent} from './components/gesture-creation/gesture-creation.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [DashboardTemplateComponent, GestureSaveComponent, SidebarComponent, GestureCreationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatButtonToggleModule,
    NgxSliderModule,
    MatStepperModule,
  ]
})
export class DashboardModule {
  constructor(translateService: TranslateService) {
    translateService.addLangs(['en']);
    translateService.setDefaultLang('en');
    ServiceInjector.injector = Injector.create({providers: services});
  }
}
