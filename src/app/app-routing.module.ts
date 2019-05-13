import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {SubcategoryComponent} from './components/category-list/subcategory/subcategory.component';
import {LoginComponent} from './models/login/login.component';
import {RegisterComponent} from './models/register/register.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {AccountGuard} from './provider/account.guard';
import {TermsComponent} from './components/footer/terms/terms.component';
import {PrivacyComponent} from './components/footer/privacy/privacy.component';
import {ReturnPolicyComponent} from './components/footer/return-policy/return-policy.component';
import {ContactUsComponent} from './components/footer/contact-us/contact-us.component';
import {VendorSignUpComponent} from './components/footer/vendor-sign-up/vendor-sign-up.component';
import { ForgotComponent } from './models/forgot/forgot.component';
// import { NoDataComponent } from './components/no-data/no-data.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'prod-list/:id', component: ProductListComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path:'vendor',component:VendorSignUpComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'return', component:ReturnPolicyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'subCat/:id', component: SubcategoryComponent},
  {path: 'detail/:id', component: ProductDetailComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'cart', loadChildren:"./components/cart/cart.module#CartModule",canActivate:[AccountGuard]},
  {path: 'stores', loadChildren:"./components/stores/stores.module#StoresModule",canActivate:[AccountGuard]},
  {path: 'account', loadChildren:"./components/account/account.module#AccountModule",canActivate:[AccountGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
