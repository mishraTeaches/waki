import { Component, OnInit } from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import { filter } from 'rxjs/operators';
import { WakiServiceService } from 'src/app/service/waki-service.service';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyconvertService } from 'src/app/provider/currencyconvert.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  currentLanguageData:any={};
  prodList:any=[];
  param1: string;
  filterCategory:any=[];
  filterBrand:any=[];
  filterlist:any=[];
  dataa:any={}
  noProductMessage:any;
  myVar1:boolean=false;
  params:any;
  noProductFound:boolean=false;
  constructor(private list:NgxUiLoaderService,private currencyConvertService:CurrencyconvertService,private router:Router,private wakiservice:WakiServiceService,private route: ActivatedRoute,private languageTranslateInfoService:ChangeLangService) {
    this.loadFilter();
    this.param1 = this.route.snapshot.params.id;
    this.route.queryParams
      .subscribe(params => {
        this.params=params['type'];
            });
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){
                 this.currentLanguageData = data;
                 this.loadProductList();
               }
       });
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       window.scrollTo(0, 0)
  }
  loadProductList()
   {
     this.list.start();
    let URL = appConstant.baseUrl+'vendor/categoryProductList';
    if(this.params=='brand'){
      this.dataa={"lang":this.currentLanguageData['lng_code'],"productListType":"brand","productCategoryId":this.param1}
    }
    else{
    this.dataa={"lang":this.currentLanguageData['lng_code'],"productCategoryId":this.param1}
    }
    this.wakiservice.createPostRequest(URL,this.dataa,0).subscribe((response: any) => {
      console.log(response);
      if(response['statusCode'] == 200)
      {
        this.list.stop();
        this.prodList=response['result'];
      }
      else if(response['statusCode']==404){
        this.list.stop()
      this.noProductMessage=response['statusMessage'];
      }

    });

      }

      loadFilter(){
        let URL = appConstant.baseUrl+'vendor/filter';
    this.dataa={"lang":this.currentLanguageData['lng_code'],"productCategoryId":this.param1}
    this.wakiservice.createPostRequest(URL,this.dataa,0).subscribe((response: any) => {
      if(response['statusCode'] == 200)
      {
        this.filterlist=response['result'][0]['sub_filter'];
      }
      else if(response['statusCode']==404){
      console.log("message");
      }

    });

      }
      selecting(id,name,event){
        if(this.params=='brand')
        {
          if(event.target.checked)
          {
            this.filterBrand.push(name);
          }
          else if (!event.target.checked){
            let index2 = this.filterBrand.indexOf(name);
            this.filterBrand.splice(index2,1);
          }
        }
        else {
          if(event.target.checked){
            this.filterCategory.push(name);
            console.log(this.filterCategory);
          }
          else if(!event.target.checked){
            let index1=this.filterCategory.indexOf(name);
            this.filterCategory.splice(index1,1);
            console.log(this.filterCategory)
          }
          // console.log(this.filterCategory);
        }
      }
    }
