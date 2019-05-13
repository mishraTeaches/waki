import { Injectable } from '@angular/core';
import { WakiServiceService } from '../service/waki-service.service';
import { appConstant } from '../constant/app.constant';
import { ChangeLangService } from './change-lang.service';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  currentLanguageData:any={};
  cartResponse:any={};
  cartResponseLength;any='';
  productDetail:any=[];
  cartcount:any="";
  constructor(private wakiservice: WakiServiceService,private languageTranslateService: ChangeLangService) { }
  lazyLoad(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   let clientHeight =  document.documentElement.clientHeight || document.body.clientHeight;
       $("img.loading").each(function(){
    let element = this;
     let offsetTopElement = $(element).offset().top;

     if(scrollTop > offsetTopElement - clientHeight) {

           $(element).attr("src",$(element).data("src"));
           $(element).addClass("loaded");
           $(element).removeClass("loading");

     }

   });
  }
  cartList(){
    let URL = appConstant.baseUrl + `vendor/listOfAddCart/?lang=${this.currentLanguageData['lng_code']}`;
    this.wakiservice.createGetRequest(URL,1).subscribe((response: any) => {
      this.cartResponse = response['result'];
      this.cartResponseLength = Object.keys(this.cartResponse).length;
      this.productDetail = this.cartResponse['productDetail'];
      if(this.cartResponseLength > 0) {
  this.cartcount = this.productDetail.length;
      }
  });
  }


}
