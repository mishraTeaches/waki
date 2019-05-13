import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import { WakiServiceService } from 'src/app/service/waki-service.service';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent{
  param1: string;
  currentLanguageData:any={};
  token:any;
  response:any={};
  show:boolean=true;
  responseData:any=[];
  dataa:any={};
  @ViewChild('showing') showing: ElementRef;
  constructor(private toastr: ToastrService,private wakiservice:WakiServiceService,private languageTranslateInfoService:ChangeLangService) {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){
                 this.currentLanguageData = data;
                 this.showWishlist();
               }
       });
       window.scrollTo(0, 0)
   }

  showWishlist()
  {
      let URL = appConstant.baseUrl+'vendor/wishList';
  this.wakiservice.createGetRequest(URL,1).subscribe((response: any) => {
    if(response['statusCode'] === 200 && response['result'].length > 0)
    {
      this.show=true;
      this.responseData=response['result'];
      this.response = response;
    }
if (response['statusCode'] === 200 && response['result'].length === 0) {
  // this.toastr.error("WishList is Empty");
  this.show=false;
}


  });
  }
  remove(id){
    let URL =  appConstant.baseUrl+'vendor/deleteWishItem';
    this.dataa={"productId": id,"lang":this.currentLanguageData['lng_code']}
    this.wakiservice.createPostRequest(URL,this.dataa,1).subscribe(response=>{
      if(response.statusCode === 200)
      {
        this.showWishlist();
        this.toastr.success(response['statusMessage']);
       }
         this.toastr.error(response['statusMessage']);
    });

  }

}
