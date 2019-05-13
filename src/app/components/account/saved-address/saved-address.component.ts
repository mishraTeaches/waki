///<reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { WakiServiceService } from 'src/app/service/waki-service.service';
import { appConstant } from 'src/app/constant/app.constant';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { MapsAPILoader } from '@agm/core';
// import {} from 'googlemaps';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $:any;
declare var google: any;
@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.component.html',
  styleUrls: ['./saved-address.component.css']
})
export class SavedAddressComponent implements AfterViewInit, OnInit {

  currentLanguageData: any = {};
  public latitude: number;
  public longitude: number;
  isFormSubmit: boolean = false;
  radioValue:any="";
  senddata:any={};
  dataa: any = {};
  data:any={};
  public zoom: number;
  addressObj: any = {};
  social: any = {};
  addressResponse: any = [];
  @ViewChild('search')  public searchElementRef: ElementRef;
  constructor(private router:Router,private toastr: ToastrService,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private wakiservice: WakiServiceService,private languageTranslateInfoService:ChangeLangService) {
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if(data){

                 this.currentLanguageData = data;
                 this.getAddress();
               }
       });
       window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    this.zoom = 12;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
         this.addressObj['address'] = place['formatted_address']
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    if (JSON.parse(localStorage.getItem('sociallogin'))){
      this.social = JSON.parse(localStorage.getItem('sociallogin'));
    }
    if (JSON.parse(localStorage.getItem('userLoginDetail'))) {
      this.social = JSON.parse(localStorage.getItem('userLoginDetail'));
      // this.social = this.data['result'];
    }
    if (JSON.parse(localStorage.getItem('register'))) {
      this.social = JSON.parse(localStorage.getItem('register'));
      console.log(this.social);
    }
  }
  getAddress() {
    let URL = appConstant.baseUrl + `user/getAddressList/?lang=${this.currentLanguageData['lng_code']}`;
    // let data={"id":this.param1,"lang":this.currentLanguageData['lng_code']}
    this.wakiservice.createGetRequest(URL, 1).subscribe((response: any) => {
      this.addressResponse = response['result'];
  });
}

private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 12;
    });
  }
}
radioSelected(value) {
  this.radioValue = value;
}
sendData(addressobj){
this.sendData = addressobj;
this.wakiservice.changeMessage(this.sendData);
this.router.navigate(['/account/edit_address']);
}
addAddress(isValid:boolean){
  this.isFormSubmit = true;
  if(this.radioValue == '') {
    this.toastr.error("please select address type")
    return;
  }
   if (!isValid)
     return
  let URL = appConstant.baseUrl + `user/addAddress`;
      this.dataa={"addresses":this.addressObj['address'],"fullName":this.addressObj['name'],"contactNumber":this.addressObj['contact'],"houseNo":this.addressObj['houseno'],"addressType":this.radioValue,"lat":this.latitude,"lng":this.longitude,"lang":this.currentLanguageData['lng_code']}
      this.wakiservice.createPostRequest(URL, this.dataa,1).subscribe((response: any) => {
        this.toastr.success(response['statusMessage']);
        this.social['address'].push(response.result.address);
      });
      this.router.navigate(['/account/address']);
}
ngAfterViewInit(): void {
  $('.addnewaddressbtnrw .addnewaddressbtn').click(function() {
    $('.add_address_formbx').slideToggle();
});
}
delete(id) {
  let URL = appConstant.baseUrl + `user/deleteAddress`;
  this.dataa={"lang":this.currentLanguageData['lng_code'],"addressId":id}
  this.wakiservice.createPostRequest(URL, this.dataa,1).subscribe((response: any) => {
    this.getAddress();
  })
}
}
