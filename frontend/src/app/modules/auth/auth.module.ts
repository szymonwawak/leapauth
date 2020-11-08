import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthTemplateComponent} from './pages/auth-template/auth-template.component';
import {LeapComponent} from './components/leap/leap.component';
import {AuthRoutingModule} from './auth-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {PersonSelectComponent} from './components/person-select/person-select.component';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {ServiceInjector, services} from '../../core/classes/service-injector';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LoginComponent} from './components/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [AuthTemplateComponent, LeapComponent, PersonSelectComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatToolbarModule,
    SharedModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class AuthModule {
  constructor(translateService: TranslateService) {
    translateService.addLangs(['en']);
    translateService.setDefaultLang('en');
    ServiceInjector.injector = Injector.create({providers: services});
  }
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
