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

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'prod-list/:id',component:ProductListComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'subCat/:id',component:SubcategoryComponent},
  {path:'detail/:id',component:ProductDetailComponent},
  {path:'cart',loadChildren:"./components/cart/cart.module#CartModule"},
  {path:'stores',loadChildren:"./components/stores/stores.module#StoresModule"},
  {path:'account',loadChildren:"./components/account/account.module#AccountModule",canActivate:[AccountGuard]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
