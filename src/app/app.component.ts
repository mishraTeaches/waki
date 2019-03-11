import { Component } from '@angular/core';
import { appConstant } from './constant/app.constant';
import {ChangeLangService} from './provider/change-lang.service';
import {WakiServiceService} from './service/waki-service.service';
import {CurrencyconvertService} from './provider/currencyconvert.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
baseUrl=appConstant['baseUrl'];
currentLanguageData:any={};
public static currencyData:any={};

constructor(private languageTranslateService:ChangeLangService,private wakiservice:WakiServiceService,private currencyconvertservice:CurrencyconvertService) { 

languageTranslateService.translateInfo.subscribe((data)=>{
  if(data){
    this.currentLanguageData=data;
  }
})

   this.loadCurrencies();
}


  loadCurrencies(){
    // let url = this.baseUrl + "front/webservice/currencies";
  //   let data = {"lang_id":this.currentLanguageData['id'],"lang":this.currentLanguageData['lng_code']}
  // this.wakiservice.createPostRequest('assets/json/currencies.json',data).subscribe((response: any) => {
    this.wakiservice.createGetRequest('assets/json/currencies.json').subscribe((response: any) => {
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
