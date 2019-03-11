import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { UserHeaderComponent } from './user-header/user-header.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods/payment-methods.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { SavedAddressComponent } from './saved-address/saved-address.component';

@NgModule({
  declarations: [AccountComponent, UserHeaderComponent, PaymentMethodsComponent, ProfileOrderComponent, SavedAddressComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    TranslateModule.forChild({
      isolate: true
  })
  ]
})
export class AccountModule { }
