import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ProductRate} from './components/product-rating.component';
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
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SubcategoryComponent } from './components/category-list/subcategory/subcategory.component';
import { LoginComponent } from './models/login/login.component';
import { DynamiSocialLoginModule, AuthServiceConfig, GoogleLoginProvider,FacebookLoginProvider } from 'ng-dynami-social-login';
import { RegisterComponent } from './models/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ReadMorePipe } from './pipe/read-more.pipe';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { HtmlSafePipe } from './pipe/html-safe.pipe';
import { TermsComponent } from './components/footer/terms/terms.component';
import { PrivacyComponent } from './components/footer/privacy/privacy.component';
import { ReturnPolicyComponent } from './components/footer/return-policy/return-policy.component';
import { ContactUsComponent } from './components/footer/contact-us/contact-us.component';
import { VendorSignUpComponent } from './components/footer/vendor-sign-up/vendor-sign-up.component';
import { ForgotComponent } from './models/forgot/forgot.component';

// import { CartComponent } from './components/cart/cart.component';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,appConstant['translateUrl'],'.json');
}

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
         {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('243365436344811')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('687581578772-3gsvg8umjajbrgn035shl6osq7r3f9pc.apps.googleusercontent.com')
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
    ProductRate,
    RegisterComponent,
    ProductListComponent,
    ReadMorePipe,
    HtmlSafePipe,
    TermsComponent,
    PrivacyComponent,
    ReturnPolicyComponent,
    ContactUsComponent,
    VendorSignUpComponent,
    ForgotComponent
    // CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    DynamiSocialLoginModule,
    FormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxFPSj1Oh9PYbbsm35CLorLQk4vtrTvvk',
      libraries: ['places']
    }),
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }) ,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}],
  bootstrap: [AppComponent]
})
export class AppModule { }
