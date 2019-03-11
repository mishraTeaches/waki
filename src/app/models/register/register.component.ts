import { Component, OnInit } from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import {WakiServiceService} from '../../service/waki-service.service';
import {ChangeLangService} from '../../provider/change-lang.service';
import {ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  isFormSubmit: boolean = false;
  currentLanguageData:{};
  title:any;
  baseUrl=appConstant['baseUrl'];
  regUser:any={};
  getCountryData:any=[];
  constructor(private router:Router,private toastr: ToastrService,private wakiService:WakiServiceService ,private languageTranslateInfoService:ChangeLangService) { 
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){
                 this.currentLanguageData = data;
               }
               this.getCountries();
       });
  }

  register(isValid: boolean)
  {
   this.isFormSubmit = true;
   if (!isValid)
     return
    //  this.ngProgress.start();
   this.regUser['type'] = 'normal';
   this.registery(this.regUser);   
  // $(".login-info").css("display", "none"); 
   
 }
 registery(userData:any){
   userData['lang'] = this.currentLanguageData['lng_code'];
  //  userData['lang_id'] = this.currentLanguageData['id'];  
   let url = this.baseUrl + "user/signup";
  this.wakiService.createPostRequest(url, userData).subscribe((response: any) => { 
  //  this.ngProgress.done();
     if(response['statusCode'] == 200)
     {
       this.toastr.success(response['statusMessage'])
       setTimeout(() => {
        this.router.navigateByUrl('/');
       }, 500);
      // this.msgStatus= true;
     }
     else{
       this.toastr.error(response['statusMessage']);
     }
  });

}
getCountries(){
  let url="assets/json/country.json";
  this.wakiService.createGetRequest(url).subscribe((response)=>{
 this.getCountryData=response['countries'];
  })
}
}
