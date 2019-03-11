import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {appConstant} from './constant/app.constant';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SubcategoryComponent } from './components/category-list/subcategory/subcategory.component';
import { LoginComponent } from './models/login/login.component';
import { DynamiSocialLoginModule, AuthServiceConfig, GoogleLoginProvider,FacebookLoginProvider } from 'ng-dynami-social-login';
import { RegisterComponent } from './models/register/register.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ReadMorePipe } from './pipe/read-more.pipe';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { HtmlSafePipe } from './pipe/html-safe.pipe';

// import { CartComponent } from './components/cart/cart.component';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,appConstant['translateUrl'],'.json');
}

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
         {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("243365436344811")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("687581578772-3gsvg8umjajbrgn035shl6osq7r3f9pc.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
    CategoryListComponent,
    ProductDetailComponent,
    SubcategoryComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ReadMorePipe,
    HtmlSafePipe
    // CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    NgxUiLoaderModule,
    DynamiSocialLoginModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }) ,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: AuthServiceConfig,useFactory: getAuthServiceConfigs}],
  bootstrap: [AppComponent]
})
export class AppModule { }
