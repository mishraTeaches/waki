import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLangService } from '../../provider/change-lang.service';
import { appConstant } from '../../constant/app.constant';
import { WakiServiceService } from '../../service/waki-service.service';
import { sendDataService } from '../../provider/sendData.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { getInjectorIndex } from '@angular/core/src/render3/di';
import { ToastrService } from 'ngx-toastr';
import {CartdetailService} from '../../provider/cartdetail.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentLanguage: any;
  baseUrl = appConstant['baseUrl'];
  categoryList: any = [];
  wishlistcountlength:any={};
  isMobile:boolean = false;
  wishlistresponse:any=[];
  wishlistCount: any = '';
  languageData: any;
  cartResponse:any={};
  productDetail:any=[];
  cartcount:any="";
  userexist:boolean=false;
cartResponseLength;any='';
   social: any = {};
  classArray:any=[];
  productcategoryId: any = [];
  childrenlength:any;
  stopApi: boolean = false;
  nohit:boolean=false;
  currentLanguageData:any={};
  tempLang: any = {}
  categoryId: any;
  subCategory: any = [];
@ViewChild('datagetting')
datagetting:ElementRef;

@HostListener('window:resize') resizeWindow()
  {
    this.checkMobileMode();
  }

  constructor(private carddetail:CartdetailService,private languageTranslateInfoService:ChangeLangService,private renderer: Renderer2,private ngxService: NgxUiLoaderService,private toastr: ToastrService,private router: Router, private senddata: sendDataService, private translate: TranslateService, private languageTranslateService: ChangeLangService, private wakiservice: WakiServiceService)
  {
    if ((localStorage.getItem('register') || localStorage.getItem('userLoginDetail') || localStorage.getItem('sociallogin') === null)) {
      this.cartcount = 0;
      this.wishlistCount = 0;
    }
    this.checkMobileMode();
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){
                 this.currentLanguageData = data;
               }
       });
       if (JSON.parse(localStorage.getItem('sociallogin'))){
         this.userexist=true;
        this.social = JSON.parse(localStorage.getItem('sociallogin'));
        this.cartList();
        this.carddetail.currentMessage.subscribe(data => {
          this.cartcount = data;
        });
        this.carddetail.wishlistMessage.subscribe(wishdata =>{
          this.wishlistCount = wishdata;
        });
      }
      if (JSON.parse(localStorage.getItem('userLoginDetail'))) {
        this.userexist=true;
        this.social = JSON.parse(localStorage.getItem('userLoginDetail'));
        this.cartList();
        this.carddetail.currentMessage.subscribe(data => {
          this.cartcount = data;
                  });
                  this.carddetail.wishlistMessage.subscribe(wishdata =>{
                    this.wishlistCount = wishdata;
                  });
        // this.social = this.data['result']
      }
      if (JSON.parse(localStorage.getItem('register'))) {
        this.userexist=true;
        this.social = JSON.parse(localStorage.getItem('register'));
        this.cartList();
        this.carddetail.currentMessage.subscribe(data => {
          this.cartcount = data;
                  });
                  this.carddetail.wishlistMessage.subscribe(wishdata => {
                    this.wishlistCount = wishdata;
                  });
      }
       this.loadLanguageData();
       this.trending();
  }
  ngOnInit() { }

  cartList(){
    let URL = appConstant.baseUrl + `vendor/listOfAddCart/?lang=${this.currentLanguageData['lng_code']}`;
    this.wakiservice.createGetRequest(URL,1).subscribe((response: any) => {
      this.cartResponse = response['result'];
      this.cartResponseLength = Object.keys(this.cartResponse).length;
      this.productDetail = this.cartResponse['productDetail'];
      if(this.cartResponseLength > 0) {
  this.cartcount = this.productDetail.length;
      }
      if(this.cartResponseLength == 0) {
        this.cartcount="";
      }
  });
  }
  getWishlist(){
        let URL = appConstant.baseUrl + 'vendor/wishList';
    this.wakiservice.createGetRequest(URL, 1).subscribe((response: any) => {
      if (response['statusCode'] === 200 && response['result'].length > 0) {
this.wishlistresponse = response['result'];
this.wishlistCount = this.wishlistresponse.length;
this.wishlistcountlength = Object.keys(this.wishlistresponse).length;
if(this.wishlistcountlength == 0) {
  this.wishlistCount = '';
}
      }
  if (response['statusCode'] === 200 && response['result'].length === 0) {

  }
    });
  }
  loadLanguageData() {
    // let url = this.baseUrl + "assets/json/get_language.json";
    // this.ngxService.start();
    this.wakiservice.createGetRequest('assets/json/get_language.json',0).subscribe((response: any) => {
      if (response['status'] == true)
      {
        // this.ngxService.stop();
        this.languageData = response;
        this.setDefaultLanguages(response);
      }
    });
  }


  setDefaultLanguages(lanData) {
    let languagesData = lanData['languages'];
    let code = [];
    for (let i = 0; i < languagesData.length; i++) {
      code.push(languagesData[i]['lng_code']);
      if (languagesData[i]['default_lang'] == 1) {
        this.currentLanguage = languagesData[i]['lng_code'];
        this.tempLang = Object.assign({}, languagesData[i]);
        // console.log("lng_code==",this.tempLang);
        this.tempLang['currencyData'] = lanData['currencyData'];
        this.tempLang['basic_path'] = lanData['basic_path'];

        this.languageTranslateService.change(this.tempLang);
      }

    }

    this.translate.addLangs(code);
    this.translate.setDefaultLang(this.currentLanguage);
    // if(this.currentLanguage == appConstant['rtl']){
    //   $(".ltr-style").remove();
    //  $('head').append(this.rtlStyle);
    // }
  }

  getCategoryId(id,index,event)
  {
    // this.nohit=true;
    // alert(index);
    // this.classArray=
    if(event.path[1].className.length>=13){
      this.nohit=true;
    }
    else{
      this.nohit=false;
    let URL = appConstant.baseUrl + 'vendor/OpenSubCategory';
    let data = { "lang": this.tempLang['lng_code'], "categoryId": id }
    this.wakiservice.createPostRequest(URL, data,0).subscribe((response: any) => {
      if (response['statusCode'] == 200)
      {
        this.subCategory = response['result'];
        // this.toastr.success(response['statusMessage']);
        //  console.log(this.subCategory)
        // $('#' + id).children().eq(1).remove();
        // let list = this.subCategory;
        // let listing = "";
        // for (let index = 0; index < list.length; index++) {
        //   listing += "<li (click)='getIndex('" + list[index]._id + "')'><a id='subcat' href='javascript:void(0)'>" + list[index].subCategoryName + "</a></li>"
        //   $('#' + id).append(`<ul class="dropdown-menu" role="menu">
        //      `+ listing + `</ul>`)
        // }
      }
    });
  }
}
  trending() {
    let URL = appConstant.baseUrl + 'vendor/getCategoryList';
    this.wakiservice.createGetRequest(URL,0).subscribe((response: any) => {
      if (response['statusCode'] == 200) {
        this.categoryList = response['result'];
      }
    });
  }
  checkMobileMode()
  {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
   else {
   this.isMobile = false;
   }
  }
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  if (this.isMobile == true) {
    $('.fullwdmenu').on('click', 'li ul.dropdown-menu li a', function() {
       $('.menu-overlay').click();
      });
  }
}
}
