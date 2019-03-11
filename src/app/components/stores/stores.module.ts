import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoresComponent} from './stores.component';
import { StoresRoutingModule } from './stores-routing.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

@NgModule({
  declarations: [StoresComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    TranslateModule.forChild({
      isolate: true
  })
  ]
})
export class StoresModule { }
