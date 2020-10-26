import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthTemplateComponent} from './pages/auth-template/auth-template.component';
import {LeapComponent} from './components/leap/leap.component';
import {AuthRoutingModule} from './auth-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PersonSelectComponent } from './components/person-select/person-select.component';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AuthTemplateComponent, LeapComponent, PersonSelectComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MatToolbarModule,
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule
    ]
})
export class AuthModule {
}
