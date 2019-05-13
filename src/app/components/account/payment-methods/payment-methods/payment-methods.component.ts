import { Component, OnInit } from '@angular/core';
import { appConstant } from 'src/app/constant/app.constant';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { WakiServiceService } from 'src/app/service/waki-service.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  social: any = {};
  data:any={};
  currentLanguageData:any={};
    constructor(private languageTranslateInfoService: ChangeLangService,private wakiservice:WakiServiceService) {
      languageTranslateInfoService.translateInfo.subscribe((data) => {
        if(data){
                   this.currentLanguageData = data;
                 }
         });
     }

    ngOnInit() {
      if (JSON.parse(localStorage.getItem('sociallogin'))){
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

}
