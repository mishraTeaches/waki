import { Component, OnInit } from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import {WakiServiceService} from '../../service/waki-service.service';
import { ActivatedRoute } from '@angular/router';
import {ChangeLangService} from '../../provider/change-lang.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
details:any=[];
param1: string;
currentLanguageData:any={};
  constructor(private wakiservice:WakiServiceService,private route: ActivatedRoute,private languageTranslateInfoService:ChangeLangService) {
    this.param1 = this.route.snapshot.params.id;
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){
                 this.currentLanguageData = data;
                 this.getDetail();
               }
       });
    
   }

getDetail(){
    let URL = appConstant.baseUrl+`vendor/productDetails/?_id=${this.param1}&lang=${this.currentLanguageData['lng_code']}`;
    // let data={"id":this.param1,"lang":this.currentLanguageData['lng_code']}
    this.wakiservice.createGetRequest(URL).subscribe((response: any) => {
      if(response['statusCode']==200){
      //  this.details=response['result'];
      console.log(JSON.stringify(response));
      }
      });
}
}
