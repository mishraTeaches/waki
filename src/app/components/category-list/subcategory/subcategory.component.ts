import { Component, OnInit,HostListener } from '@angular/core';
import {appConstant} from '../../../constant/app.constant';
import {WakiServiceService} from '../../../service/waki-service.service';
import {ChangeLangService} from '../../../provider/change-lang.service';
import { ActivatedRoute, Router , NavigationStart} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {
  subCategoryList:any=[];
  category_list:any=[];
  color:any=appConstant['color'];
  gettingData:any=[];
  param1: string;
  prodAvail:boolean=false;
  subCategoryNotFound:boolean=false;
  catId:any;
  currentLanguageData:any={};
  constructor(private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router:Router,private route: ActivatedRoute,private wakiservice:WakiServiceService,private languageTranslateInfoService:ChangeLangService)
  {
    this.param1 = this.route.snapshot.params.id;
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){
                 this.currentLanguageData = data;
                this.SubCategory();
               }
       });
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }
 SubCategory(){
  this.ngxService.start();
    let URL = appConstant.baseUrl+'vendor/getProductCategoryName';
    let data={"lang":this.currentLanguageData['lng_code'],"subCategoryId":this.param1}
    this.wakiservice.createPostRequest(URL,data,0).subscribe((response: any) => {
      if(response['statusCode']==200){
        this.ngxService.stop();
        this.prodAvail=true;
       this.subCategoryList=response['result'];
        console.log("DATA",this.subCategoryList)

      }
      else{
        this.toastr.error(response['statusMessage'])
        this.subCategoryNotFound=response['statusMessage'];
        this.prodAvail=false;
        this.ngxService.stop();
      }
      });
  }
}
