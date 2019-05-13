import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { appConstant } from 'src/app/constant/app.constant';
import { WakiServiceService } from 'src/app/service/waki-service.service';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  social:any={};
  dataa:any={};
  password:any={};
  hidechangepassword:boolean=false;
  isFormSubmit:boolean=false;
  forgotform: FormGroup;
  currentLanguageData:any={};
  matchinvalid:boolean=true;
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private router: Router,private wakiservice: WakiServiceService,private languageTranslateInfoService:ChangeLangService) {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){

                 this.currentLanguageData = data;
               }
       });
       window.scrollTo(0, 0);
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('sociallogin'))){
      this.hidechangepassword = true;
      this.social = JSON.parse(localStorage.getItem('sociallogin'));
    }
    if (JSON.parse(localStorage.getItem('userLoginDetail'))) {
      this.social = JSON.parse(localStorage.getItem('userLoginDetail'));
      // this.social = this.data['result']
    }
    if (JSON.parse(localStorage.getItem('register'))) {
      this.social = JSON.parse(localStorage.getItem('register'));
      console.log(this.social);
    }
    // console.log(this.social);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  changePassword(isValid:boolean){
    this.isFormSubmit = true;
    if (!isValid)
    return
    let URL = appConstant.baseUrl + 'user/changePassword';
      this.dataa = {"_id":this.social['_id'],"oldPassword":this.password['new_password'],"newPassword":this.password['confirm_password'],"lang":this.currentLanguageData['lng_code']}
      this.wakiservice.createPostRequest(URL, this.dataa,1).subscribe((response: any) => {
        if(response['statusCode']==200){
        this.toastr.success(response['statusMessage']);
        }
        else{
          this.toastr.error(response['statusMessage']);
        }
  });
}
}
