import { Component, OnInit } from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import {WakiServiceService} from '../../service/waki-service.service';
import {ToastrService } from 'ngx-toastr';
import {ChangeLangService} from '../../provider/change-lang.service';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'ng-dynami-social-login';
import { CartdetailService } from 'src/app/provider/cartdetail.service';
// import {FacebookLoginService} from '../../provider/facebook-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUser: any = {};
  baseUrl=appConstant['baseUrl'];
  isFormSubmit: boolean = false;
  currentLanguageData:any={};
  token:any='';
  responsedata:any={};
  socialsignIN:any={};
  title:any;
  socialchecking:any={};

  constructor(private cartdetail:CartdetailService,private router:Router,private socialAuthService: AuthService,private toastr: ToastrService,private wakiService:WakiServiceService,private languageTranslateInfoService:ChangeLangService)
  {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data)
      {
                 this.currentLanguageData = data;
               }
       });
  }
  // facebooklogin:FacebookLoginService,
  validateLogin(isValid: boolean)
  {
   this.isFormSubmit = true;
   if (!isValid)
     return
     this.login(this.loginUser);
 }
 login(userData:any)
 {
   userData['lang'] = this.currentLanguageData['lng_code'];
   userData['userType']="user";
  //  userData['lang_id'] = this.currentLanguageData['id'];
   let url = this.baseUrl + "user/login";
  this.wakiService.createPostRequest(url, userData,0).subscribe((response: any) => {
  //  this.ngProgress.done();
     if(response['statusCode'] == 200)
     {
      // this.msgStatus= true;
       this.title = response['statusMessage'];
       this.toastr.success(this.title)
       let decriptData = response;
       localStorage.setItem("userLoginDetail",JSON.stringify(decriptData['result']));
       this.responsedata = JSON.parse(localStorage.getItem("userLoginDetail"));
    // this.token = decriptData['accessToken'];
    localStorage.setItem("accessToken", decriptData['accessToken']);
    console.log("tokenn",this.token);

       setTimeout(() => {
        this.router.navigateByUrl('/');
       }, 1000);
     }
      if(response['statusCode'] === 404){
      this.toastr.error(response['statusMessage']);
      }
      else {
        this.toastr.error(response['statusMessage']);
      }

  });
}
public socialSignIn(socialPlatform: string) {
  let socialPlatformProvider;
  if(socialPlatform === 'facebook') {
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  }
  if (socialPlatform === 'google') {
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    console.log("socialplatofrm",socialPlatformProvider);
  }
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      this.socialchecking['socialId'] = userData['id'];
      this.socialchecking['lang'] = this.currentLanguageData['lng_code'];
      this.socialsignIN['lang'] = this.currentLanguageData['lng_code'];
      this.socialsignIN['socialType'] = userData['provider'];
      this.socialsignIN['socialId'] = userData['id'];
      this.socialsignIN['email'] = userData['email'];
      this.socialsignIN['firstName'] = userData['name'];
      // this.socialsignIN['phone']='12121213';
      this.socialCheck(this.socialchecking);
    }
  );
}
socialCheck(usersocialcheckData:any){
  console.log(usersocialcheckData);
  let url = this.baseUrl + "user/checkSocialProfile";
    this.wakiService.createPostRequest(url, usersocialcheckData,0).subscribe((response: any) => {
       if(response['statusCode'] === 200) {
         this.toastr.success(response['statusMessage']);
         this.responsedata=response['accessToken']
         localStorage.setItem("sociallogintoken", this.responsedata);
         localStorage.setItem("sociallogin" , JSON.stringify(response['result']));
         setTimeout(() => {
          this.router.navigateByUrl('/');
         }, 1000);

        //  localStorage.setItem('sociallogin', JSON.stringify(response['result']));
       }
        else{
        //  this.toastr.error(response['statusMessage']);
         setTimeout(() => {
          this.sociallogin(this.socialsignIN);
        }, 1000);
       }
});
}
 sociallogin(usersocialData:any)
  {
    let url = this.baseUrl + "user/socialLogin";
   this.wakiService.createPostRequest(url, usersocialData,0).subscribe((response: any) => {
      if(response['statusCode'] == 200)
      {
        this.title = response['statusMessage'];
        this.toastr.success(this.title)
        let decriptData = response;
        localStorage.setItem("sociallogin" , JSON.stringify(response['result']));
        localStorage.setItem("accessToken",response['accessToken'])
        this.router.navigateByUrl('/');
      }
      else{
        this.toastr.error(response['statusMessage']);
      }
   });
 }
}
