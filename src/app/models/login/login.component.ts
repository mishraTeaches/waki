import { Component, OnInit } from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import {WakiServiceService} from '../../service/waki-service.service';
import {ToastrService } from 'ngx-toastr';
import {ChangeLangService} from '../../provider/change-lang.service';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'ng-dynami-social-login';
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
  socialsignIN:any={};
  title:any;
  socialchecking:any={};

  constructor(private router:Router,private socialAuthService: AuthService,private toastr: ToastrService,private wakiService:WakiServiceService,private languageTranslateInfoService:ChangeLangService) { 
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
    //  this.ngProgress.start();
  //  this.loginUser['type'] = 'normal';
   this.login(this.loginUser);   
  // $(".login-info").css("display", "none"); 
   
 }
 login(userData:any)
 {
   userData['lang'] = this.currentLanguageData['lng_code'];
   userData['userType']="user";
  //  userData['lang_id'] = this.currentLanguageData['id'];  
   let url = this.baseUrl + "user/login";
  this.wakiService.createPostRequest(url, userData).subscribe((response: any) => { 
  //  this.ngProgress.done();
     if(response['statusCode'] == 200)
     {
      // this.msgStatus= true;
       this.title = response['statusMessage'];
       this.toastr.success(this.title)
       let decriptData = response;
       localStorage.setItem("userLoginDetail",JSON.stringify(decriptData));
       setTimeout(() => {
        this.router.navigateByUrl('/');
       }, 500);
     }
     else if(response['statusCode']==404)
     {
       this.toastr.error(response['statusMessage']);
     }
  });
}
public socialSignIn(socialPlatform : string) 
{
  let socialPlatformProvider;
  if(socialPlatform == "facebook")
  {
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  }else if(socialPlatform == "google")
  {
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  } 
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      // userData=this.currentLanguageData['lng_code'];
      this.socialchecking['socialId']=userData['id'];
      this.socialchecking['lang']=this.currentLanguageData['lng_code'];
      this.socialsignIN['lang']=this.currentLanguageData['lng_code'];
      this.socialsignIN['socialType']=userData['provider'];
      this.socialsignIN['socialId']=userData['id'];
      this.socialsignIN['email'] = userData['email'];
      this.socialsignIN['firstName']=userData['name'];
      // this.socialsignIN['phone']='12121213';
      this.socialCheck(this.socialchecking);
    }
  );
}
socialCheck(usersocialcheckData:any){
  let url = this.baseUrl + "user/checkSocialProfile";
    this.wakiService.createPostRequest(url, usersocialcheckData).subscribe((response: any) => { 
       if(response['statusCode'] == 200)
       {
         console.log(response);
       }
       else if(response['statusCode']==404){
         this.toastr.error(response['statusMessage'])
         setTimeout(() => {
           this.sociallogin(this.socialsignIN);
         }, 1000);
       }
});
}
 sociallogin(usersocialData:any)
  {
    let url = this.baseUrl + "user/socialLogin";
   this.wakiService.createPostRequest(url, usersocialData).subscribe((response: any) => { 
      if(response['statusCode'] == 200)
      {
        this.title = response['statusMessage'];
        this.toastr.success(this.title)
        let decriptData = response;
        localStorage.setItem("userLoginDetail",JSON.stringify(decriptData));
        setTimeout(() => {
         this.router.navigateByUrl('/');
        }, 500);
      
      }
      else if(response['statusCode']==404)
      {
        this.toastr.error(response['statusMessage']);
      }
   });
 }
}