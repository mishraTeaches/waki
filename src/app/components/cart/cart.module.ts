import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {CartComponent} from './cart.component';
import {CartRoutingModule} from './cart-routing.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    TranslateModule.forChild({
      isolate: true
  })
  ]
})
export class CartModule { }
