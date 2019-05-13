import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { UserHeaderComponent } from './user-header/user-header.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods/payment-methods.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { SavedAddressComponent } from './saved-address/saved-address.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [AccountComponent, UserHeaderComponent, PaymentMethodsComponent, ProfileOrderComponent,
    SavedAddressComponent, EditAddressComponent, SettingComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule,
    TranslateModule.forChild({
      isolate: true
  })
  ]
})
export class AccountModule { }
