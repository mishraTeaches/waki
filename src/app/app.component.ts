import { Component,ViewEncapsulation } from '@angular/core';
import { appConstant } from './constant/app.constant';
import {ChangeLangService} from './provider/change-lang.service';
import {WakiServiceService} from './service/waki-service.service';
import {CurrencyconvertService} from './provider/currencyconvert.service';
import { CartdetailService } from './provider/cartdetail.service';
import {ConnectionService} from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
baseUrl=appConstant['baseUrl'];
currentLanguageData:any={};
public static currencyData:any={};
constructor(private toastr: ToastrService,private internetchecker:ConnectionService,private languageTranslateService:ChangeLangService,private wakiservice:WakiServiceService,private currencyconvertservice:CurrencyconvertService) {
languageTranslateService.translateInfo.subscribe((data)=>{
  if(data){
    this.currentLanguageData=data;
  }
})
   this.loadCurrencies();
}

  loadCurrencies(){
    this.wakiservice.createGetRequest('assets/json/currencies.json',0).subscribe((response: any) => {
    if(response['status'] == true && response['data'].length > 0){
      for(let i = 0; i<response['data'].length;i++){
        AppComponent.currencyData[response['data'][i]['code']] = response['data'][i];
        if(response['data'][i].default == 1){
         // alert(response['data'][i].code);
          this.currencyconvertservice.currentCurrencyData = response['data'][i];
          console.log(this.currencyconvertservice.currentCurrencyData);
         }
        }
      this.currencyconvertservice.currencyData = AppComponent.currencyData;
     }

  });
 }


}
