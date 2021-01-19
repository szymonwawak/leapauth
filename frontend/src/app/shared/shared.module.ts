import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigatorComponent} from './components/navigator/navigator.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {SingleStatsComponent} from './components/single-stats/single-stats.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [NavigatorComponent, SingleStatsComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        TranslateModule,
    ],
    exports: [
        NavigatorComponent,
        SingleStatsComponent
    ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
