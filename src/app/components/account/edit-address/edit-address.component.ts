///<reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { WakiServiceService } from 'src/app/service/waki-service.service';
import { ToastrService } from 'ngx-toastr';
import { appConstant } from 'src/app/constant/app.constant';
import { ActivatedRoute, Router } from '@angular/router';
import {ChangeLangService} from '../../../provider/change-lang.service';
import { MapsAPILoader } from '@agm/core';
// import {} from 'googlemaps';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit{
  isFormSubmit:boolean=false;
  currentLanguageData: any = {};
  param1: string;
  radioValue: any = "";
  public zoom: number;
  addressObj:any={};
  public latitude: number;
  @ViewChild('search')  public searchElementRef: ElementRef;
  public longitude: number;
  currentAddressId : any;
  social: any = {};
  getData:any={};
  dataa: any = {};
  // message:any={};
  addressResponse: any = [];
  constructor(private router:Router,private wakiservice: WakiServiceService,private ngZone:NgZone,private mapsAPILoader: MapsAPILoader,private route: ActivatedRoute,private toastr: ToastrService,private languageTranslateInfoService:ChangeLangService) {
    this.param1 = this.route.snapshot.params.id;
    languageTranslateInfoService.translateInfo.subscribe((data) => {
      if (data) {

                 this.currentLanguageData = data;
               }
       });
       window.scrollTo(0, 0);

  }

  ngOnInit(): void {
    this.wakiservice.currentMessage.subscribe(message => {
      this.addressObj = message;
      console.log("address",this.addressObj);
    })
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
  editAddress(isValid: boolean) {
console.log("value",this.radioValue);
    this.isFormSubmit = true;
    if (this.addressObj['addressType'] === '') {
      this.toastr.error("please select address type");
      return;
    }
     if (!isValid)
       return
      let URL = appConstant.baseUrl + `user/editAddress`;
        this.dataa={"addressId":this.addressObj['_id'],"lng":this.addressObj['lng'],"lat":this.addressObj['lat'],"houseNo":this.addressObj['houseNo'],"fullName":this.addressObj['fullName'],"contactNumber":this.addressObj['contactNumber'],"addresses":this.addressObj['addresses'],"addressType":this.radioValue,"countryCode":this.addressObj['countryCode']}
        this.wakiservice.createPostRequest(URL, this.dataa,1).subscribe((response: any) => {
          this.toastr.success("Updated Successfully");
        })
this.router.navigate(['/account/address']);
  }

}
