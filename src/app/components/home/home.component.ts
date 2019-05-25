import { Component,ElementRef,HostListener, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import {WakiServiceService} from '../../service/waki-service.service';
import {CurrencyconvertService} from '../../provider/currencyconvert.service';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import {GlobalService} from '../../provider/global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { flatMap } from 'rxjs/operators';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit{
  baseUrl=appConstant['baseUrl'];
  homedata:any={};
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
// tslint:disable-next-line: max-line-length
  constructor(private cd: ChangeDetectorRef,private toastr: ToastrService,private ngxService: NgxUiLoaderService,private global:GlobalService,private wakiservice:WakiServiceService,private element: ElementRef,private currencyConvertService:CurrencyconvertService,private languageTranslateInfoService:ChangeLangService)
  {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
        if(data){
                   this.currentLanguageData = data;
                   this.loadHomeData();
                 }
         });
         $("html, body").animate({ scrollTop: 0 }, "slow");
   }
//    @HostListener('window:scroll', ['$event'])
//    dotheJob(event) {
//      this.global.lazyLoad();
//    }
  loadHomeData()
   {
     this.ngxService.start();
    let URL = appConstant.baseUrl + `vendor/homeScreenAPi?lang=${this.currentLanguageData['lng_code']}`;
    this.wakiservice.createGetRequest(URL,0).subscribe((response: any) => {
      if(response['statusCode'] === 200)
      {
        this.ngxService.stop();
        this.homedata = response['result'];
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
      collectionslider(){
        $('.colectionSlider').owlCarousel({
          loop: true,
          margin: 5,
          nav: false,
          dots: true,
          vertical:true,
          autoplay: true,
          mouseDrag : false,
          touchDrag : false,
          pullDrag:false,
          freeDrag:false,
          rewind:false,
          animateOut: 'slideOutUp',
          animateIn: 'slideInUp',
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
      trending(){
        $('.trendingfahion').owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          dots: false,
          autoplay: false,
          responsive: {
              0: {
                  items: 1
              },
              480: {
                  items: 2
              },
              580: {
                  items: 3
              },
              639: {
                  items: 4
              },
              768: {
                  items: 5
              },
              1024: {
                  items: 5
              }
          }
      });
      }
      mobileslider() {
        $('.topitemsproductsSlbx').owlCarousel({
          loop: true,
          margin: 25,
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
        // this.ngxService.start();
        setTimeout(()=>{
            // this.ngxService.stop();
          this.topBrandsSlider(),
          this.loadCaraousel(),
          this.mobileslider();
          this.collectionslider();
          this.trending();
        }, 2000);
        this.cd.detectChanges();

      }
    //   addNewBlock(event)
    //   {
    //     if(this.homedata['Category'].length === this.homeCategory.length){
    //       this.isLoader = false;
    //       alert("equal")
    //     }
    //   if(this.homedata.length > this.homeCategory.length)
    //   {
    //     alert("not")
    //     this.homeCategory.push(this.homedata[this.homeCategory.length]);
    //   }
    // }

}
