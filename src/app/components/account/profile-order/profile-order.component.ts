import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { WakiServiceService } from 'src/app/service/waki-service.service';
import { appConstant } from 'src/app/constant/app.constant';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { CurrencyconvertService } from 'src/app/provider/currencyconvert.service';
declare var $:any;
@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.css']
})
export class ProfileOrderComponent implements OnInit, AfterViewInit {
social: any = {};
addressResponse:any=[];
currentLanguageData:any={};
result:any={};

productDetail:any=[];
deliveryAddress:any={};
data:any={};
  constructor(private wakiservice: WakiServiceService,private currencyConvertService:CurrencyconvertService,private languageTranslateInfoService:ChangeLangService) {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){

                 this.currentLanguageData = data;
                 this.getOrderList();
               }
       });
       window.scrollTo(0, 0);
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
  getOrderList() {
    let URL = appConstant.baseUrl + `vendor/orderList/?lang=${this.currentLanguageData['lng_code']}`;
    // let data={"id":this.param1,"lang":this.currentLanguageData['lng_code']}
    this.wakiservice.createGetRequest(URL, 1).subscribe((response: any) => {
      this.addressResponse = response['result'];
      this.productDetail = this.addressResponse['productDetail'];
      this.deliveryAddress = this.productDetail['deliveryAddress'];
      this.result = Object.keys(this.addressResponse).length;

  });
  }
  showContent()
  {
 $('.orderlistContent .orderidprobox').click(function(){
  var nextul = $(this).parents('.orderlistContent .orderidproConwrap').find('.delivereddetailsbox');
  if(nextul.css('display')=='none'){
    $('.delivereddetailsbox').slideUp();
    nextul.slideDown();
    $('.orderlistContent .orderidproConwrap').removeClass('active');
    $(this).parents('.orderlistContent .orderidproConwrap').addClass('active');
  }else{
    nextul.slideUp();
    $('.orderlistContent .orderidproConwrap').removeClass('active');
  }
  });
  }
ngAfterViewInit(): void {
  setTimeout(() => {
    this.showContent();
  }, 2000);

}
}
