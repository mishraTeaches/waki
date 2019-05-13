import { Component, OnInit } from '@angular/core';
import { WakiServiceService } from 'src/app/service/waki-service.service';
import { appConstant } from 'src/app/constant/app.constant';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  dataa:any={};
  forgot:any={};
  isFormSubmit:boolean=false;
  statusMessage:any="";
  currentLanguageData:any={};
  constructor(private toastr: ToastrService,private wakiservice: WakiServiceService,private languageTranslateInfoService:ChangeLangService) {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){

                 this.currentLanguageData = data;
               }
       });
       window.scrollTo(0, 0);
  }
  ngOnInit() {
  }
forgotPassword(isValid:boolean){
  this.isFormSubmit = true;
    if (!isValid)
    return
  let URL =  appConstant.baseUrl+ 'user/forgotPassword';
  this.dataa={"email": this.forgot['email'],"lang": this.currentLanguageData['lng_code']}
  this.wakiservice.createPostRequest(URL, this.dataa,0).subscribe(response => {
    if(response.statusCode === 200){
this.statusMessage = response['statusMessage'];
this.toastr.success(response['statusMessage']);
     }
     else {
       this.toastr.error(response['statusMessage']);
     }
  });
}
}
