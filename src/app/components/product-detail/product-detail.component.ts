import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {appConstant} from '../../constant/app.constant';
import {WakiServiceService} from '../../service/waki-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CurrencyconvertService} from '../../provider/currencyconvert.service';
import {ChangeLangService} from '../../provider/change-lang.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { CartdetailService } from 'src/app/provider/cartdetail.service';
declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent {
details:any=[];
showloader:boolean=false
param1: string;
userlogindetail:any={};
dataa:any={}
productdetail: any = [];
sizeValue:any = "";
wishlistcount:any='';
ratingandreview:any=[];
cartcount:any='';
wishlistresponse:any=[];
gotocart:boolean = false;
colorSelected:any="";
isReadeMore:boolean = true;
wishlistcountlength:any={};
responseData:any=[];
cartResponse:any={};
cartResponseLength;any='';
images:any=[];
productdetailcart:any=[];
productDesReadMoreLength = 20;
products:any={};
materialValue:any="";
colorValue:any;
gotowishlist:boolean=false;
similarproduct:any=[];
sellerinfo:any={};
currentLanguageData: any = {};
  constructor(private ngxService: NgxUiLoaderService,private router:Router,private carddetail:CartdetailService,public currencyConvertService:CurrencyconvertService,private toastr: ToastrService,private wakiservice: WakiServiceService, private route: ActivatedRoute,private languageTranslateInfoService:ChangeLangService)
  {
    this.productIsExistInCart();
    this.param1 = this.route.snapshot.params.id;
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){

                 this.currentLanguageData = data;
                 this.getDetail();
                 this.cartList();
                 this.showWishlist();
               }
       });
       window.scrollTo(0, 0);
   }

// tslint:disable-next-line: use-life-cycle-interface
ngAfterViewInit(): void {
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
$('.proImgWrap').imagesLoaded( function() {
  $("#exzoom").exzoom({
    autoPlay: false,
  });
  $("#exzoom").removeClass('hidden')
});
let newWidth = $('.product-image').width();
$(".exzoom").width(newWidth);
$(".exzoom_nav").width(newWidth);
$(document).resize(function(){
  let newWidth = $('.product-image').width();
  $(".exzoom").width(newWidth);
  $(".exzoom_nav").width(newWidth);
});
}
getDetail(){
$("#wrapper").css("display","none");
    let URL = appConstant.baseUrl+`vendor/productDetails/?_id=${this.param1}&lang=${this.currentLanguageData['lng_code']}`;
    // let data={"id":this.param1,"lang":this.currentLanguageData['lng_code']}
    this.wakiservice.createGetRequest(URL,0).subscribe((response: any) => {
      if (response['statusCode'] === 200) {
        this.showloader=false;
        $("#wrapper").css("display","block");
        // this.toastr.success(response['statusMessage']);
        this.productdetail = response['result'];
        this.similarproduct = this.productdetail['similarProduct'];
        this.ratingandreview = this.productdetail['reviewAndRating'];
        this.products = this.productdetail['product'];
        if(this.productDesReadMoreLength >= (this.products).length) {
          this.isReadeMore = false;

      }
        this.images = this.products['image'];
        this.sellerinfo = this.productdetail['sellerInfo'];
      }
      else{
        this.toastr.error(response['statusMessage']);
      }
      });
}
readeMore() {
  this.isReadeMore = !this.isReadeMore;
}
radioChangeHandler(event) {
this.sizeValue = event.target.value;
}
radioColorHandler(event) {
  this.colorSelected = event.target.value;
}
radioMaterialHandler(event) {
this.materialValue = event.target.value;
}
addtowishlist()
  {
    if(this.sizeValue =='' || this.materialValue =='' || this.colorSelected =='')
    {
      this.toastr.error("please fill variants")
      return;

    }
    else if(localStorage.getItem("userLoginDetail") || localStorage.getItem("register") || localStorage.getItem("sociallogin"))
    {
      let URL = appConstant.baseUrl+`vendor/addToWishList`;
      this.dataa={"lang":this.currentLanguageData['lng_code'],"productId":this.param1,"size":this.sizeValue,"color":this.colorSelected,"material":this.materialValue}
      this.wakiservice.createPostRequest(URL, this.dataa,1).subscribe((response: any) => {
        if(response['statusCode'] === 200)
        {
          this.showWishlist();
          this.toastr.success(response['statusMessage']);
        }
        else{
    this.toastr.error(response['statusMessage']);
        }

      });
    }
    else{
      this.toastr.error("you are not logged in ");
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
      }
setTimeout(() => {
  this.carddetail.wishlistCount(this.wishlistcount);
}, 2000);
  }
  cartList(){
    let URL = appConstant.baseUrl + `vendor/listOfAddCart/?lang=${this.currentLanguageData['lng_code']}`;
    this.wakiservice.createGetRequest(URL,1).subscribe((response: any) => {
      this.cartResponse = response['result'];
      this.productdetailcart = this.cartResponse['productDetail'];
      this.productIsExistInCart();
      this.cartResponseLength = Object.keys(this.cartResponse).length;
      if(this.cartResponseLength > 0) {
        this.cartcount = this.productdetailcart.length || this.cartResponseLength;
            }
            else {
              this.cartcount = this.cartResponseLength;
            }
  });
  }
  addtocart(){
    if(this.sizeValue =='' || this.materialValue =='' || this.colorSelected =='')
    {
      this.toastr.error("please fill variants")
      return;
    }
    else if(localStorage.getItem("userLoginDetail") || localStorage.getItem("register") || localStorage.getItem("sociallogin")){
      let URL = appConstant.baseUrl+`vendor/addToCart`;
  this.dataa={"lang":this.currentLanguageData['lng_code'],"productId":this.param1,"size":this.sizeValue,"color":this.colorSelected,"material":this.materialValue}
  this.wakiservice.createPostRequest(URL, this.dataa,1).subscribe((response: any) => {
    if(response['statusCode'] == 200)
    {
      this.cartList();
      this.toastr.success(response['statusMessage']);
    }
    else{
this.toastr.error(response['statusMessage']);
    }
  });
}
else{
  this.toastr.error("you are not logged in ");
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 1000);
  }
  setTimeout(() => {
    this.carddetail.changeMessage(this.cartcount);
  }, 3000);
}

productIsExistInCart(){
  let status = false;
  this.productdetailcart.map((item) => {
    if (this.param1 == item['productId']) {
          status = true;
    }
  });
  this.gotocart = status;
}
showWishlist()
  {
      let URL = appConstant.baseUrl + 'vendor/wishList';
  this.wakiservice.createGetRequest(URL,1).subscribe((response: any) => {
    if (response['statusCode'] === 200 && response['result'].length > 0)
    {
this.wishlistcount = this.wishlistresponse.length;
if(this.wishlistcount == 0) {
  this.wishlistcount = '';
}
      this.responseData = response['result'];
      this.productIsExistsInWishlist();
    }
  });
  }

  productIsExistsInWishlist() {
    let status = false;
    this.responseData.map((item) => {
    if(this.param1 == item['productId']){
      status = true;
    }
    });
    this.gotowishlist = status;
  }
buyNow() {
  if (this.sizeValue === '' || this.materialValue === '' || this.colorSelected === '')
  {
    this.toastr.error("please fill variants")
    return;
  }
  else if(localStorage.getItem("userLoginDetail") || localStorage.getItem("register") || localStorage.getItem("sociallogin")){
    let URL = appConstant.baseUrl+`vendor/addToCart`;
this.dataa={"lang":this.currentLanguageData['lng_code'],"productId":this.param1,"size":this.sizeValue,"color":this.colorSelected,"material":this.materialValue}
this.wakiservice.createPostRequest(URL, this.dataa,1).subscribe((response: any) => {
  if(response['statusCode'] === 200)
  {
    this.toastr.success(response['statusMessage']);
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 1000);
  }

  else{
this.toastr.error(response['statusMessage']);
if(response['statusCode']=== 409){
  setTimeout(() => {
    this.router.navigate(['/cart']);
  }, 1000);
}
  }


});
}
else{
this.toastr.error("you are not logged in ");
setTimeout(() => {
  this.router.navigate(['/login']);
}, 1000);
}
}


}
