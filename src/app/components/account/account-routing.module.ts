import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{AccountComponent} from './account.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods/payment-methods.component';
import { SavedAddressComponent } from './saved-address/saved-address.component';

const routes: Routes = [
  {path:'',component:AccountComponent,
  children:[
      {path: 'profile',component:ProfileOrderComponent},
      {path:'',component:ProfileOrderComponent},
      {path:'payment',component:PaymentMethodsComponent},
      {path:'address',component:SavedAddressComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
