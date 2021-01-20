import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceInjector, services} from './core/classes/service-injector';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './core/services/auth.service';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "./modules/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}, TranslateModule],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private authService: AuthService) {
    ServiceInjector.injector = Injector.create({providers: services});
  }
}
