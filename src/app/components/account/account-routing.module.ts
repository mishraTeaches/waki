import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods/payment-methods.component';
import { SavedAddressComponent } from './saved-address/saved-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import {SettingComponent} from './setting/setting.component';

const routes: Routes = [
  {path: '' , component: AccountComponent,
  children: [
      {path: 'profile', component: ProfileOrderComponent},
      {path: '', component: ProfileOrderComponent},
      {path: 'edit_address', component: EditAddressComponent},
      {path: 'payment', component: PaymentMethodsComponent},
      {path: 'settings', component: SettingComponent},
      {path: 'address', component: SavedAddressComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
