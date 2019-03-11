import { Component,ElementRef,HostListener} from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import {WakiServiceService} from '../../service/waki-service.service';
import {CurrencyconvertService} from '../../provider/currencyconvert.service';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import {GlobalService} from '../../provider/global.service';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  baseUrl=appConstant['baseUrl'];
  homedata:any;
  banner:any=[];
  // @ViewChild('categoriesTypesProduct') categoriesTypesProduct:any;
  slideIndex:number = 0;
  categoryProduct:any = null;
  topPromotedDeals:any;
  loadcategoriesDataTimeStatus:any;
  topPicksMobile:any=[];
  isLoader:boolean=true;
  topBrands:any=[];
  homeCategory:any=[];
  categoryTypesData:any = {};
  currentLanguageData:any={};
  topPicksFashion:any=[];
       categoriesData:Array<any> = [];
       pagNo:number = 1;
  // categoryTypesData:any = {};
  constructor(private global:GlobalService,private wakiservice:WakiServiceService,private element: ElementRef,private currencyConvertService:CurrencyconvertService,private languageTranslateInfoService:ChangeLangService) 
  {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
        if(data){
                   this.currentLanguageData = data;
                   this.loadHomeData();
                 }
         });
         $("html, body").animate({ scrollTop: 0 }, "slow");
   }
   @HostListener('window:scroll', ['$event']) 
   dotheJob(event) {
     this.global.lazyLoad();
   }
  loadHomeData()
   {
    let URL = appConstant.baseUrl+`vendor/homeScreenAPi?lang=${this.currentLanguageData['lng_code']}`;
    this.wakiservice.createGetRequest(URL).subscribe((response: any) => {
      if(response['statusCode'] == 200)
      {
        console.log(response.result)
         
          this.homedata = response['result'];
          this.addNewBlock('event');
        this.topPromotedDeals=this.homedata['Top Promoted Deals'];
       this.banner=this.homedata['Top Deals'];
       this.topPicksMobile=this.homedata['Top Picks in Mobile'];
       this.topBrands=this.homedata['Brand'];
       this.topPicksFashion=this.homedata['Top Picks in Fashion'];

      }
       // alert(1)
    });
      
      }
      loadCaraousel(){
        $('#bannerslider').owlCarousel({
          loop: true,
          margin: 5,
          nav: false,
          dots: true,
          autoplay: true,
          responsive: {
              0: {
                  items: 1
              },
              768: {
                  items: 1
              },
              1024: {
                  items: 1
              }
          }
      });

      }
      topBrandsSlider(){
        $('#brandslogo').owlCarousel({
          loop: false,
          margin: 30,
          nav: false,
          dots: true,
          autoplay: false,
          responsive: {
              0: {
                  items: 4
              },
              480: {
                  items: 5
              },
              768: {
                  items: 6
              },
              1024: {
                  items: 10
              }
          }
      });
      }
      mobileslider(){
        $('.topitemsproductsSlbx').owlCarousel({
          loop: true,
          // margin: 25,
          nav: false,
          dots: true,
          autoplay: false,
          responsive: {
              0: {
                  items: 1
              },
              480: {
                  items: 2
              },
              768: {
                  items: 3
              },
              1023: {
                  items: 4
              },
              1170: {
                  items: 5
              }
          }
      });
      }
      ngAfterViewInit(){
        setTimeout(()=>{
          this.topBrandsSlider(),
          this.loadCaraousel(),
          this.mobileslider();
        },1000);
      
      }
      addNewBlock(event){
        if(this.homedata.length == this.homeCategory.length)
          this.isLoader = false;
      if(this.homedata.length > this.homeCategory.length){
        this.homeCategory.push(this.homedata[this.homeCategory.length]);  
      }
    }

}
