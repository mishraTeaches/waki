import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLangService } from '../../provider/change-lang.service';
import { appConstant } from '../../constant/app.constant';
import { WakiServiceService } from '../../service/waki-service.service';
import { sendDataService } from '../../provider/sendData.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { getInjectorIndex } from '@angular/core/src/render3/di';
import { ToastrService } from 'ngx-toastr';

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
  languageData: any;
  productcategoryId: any = [];
  stopApi: boolean = false;
  tempLang: any = {}
  categoryId: any;
  subCategory: any = [];


  constructor(private toastr: ToastrService,private router: Router, private senddata: sendDataService, private translate: TranslateService, private languageTranslateService: ChangeLangService, private wakiservice: WakiServiceService) {
    this.loadLanguageData();
    this.trending();
  }

  ngOnInit() {
  }

  loadLanguageData() {
    // let url = this.baseUrl + "assets/json/get_language.json";
    this.wakiservice.createGetRequest('assets/json/get_language.json').subscribe((response: any) => {
      if (response['status'] == true) 
      {
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

  getCategoryId(id) 
  {
    let URL = appConstant.baseUrl + 'vendor/OpenSubCategory';
    let data = { "lang": this.tempLang['lng_code'], "categoryId": id }
    this.wakiservice.createPostRequest(URL, data).subscribe((response: any) => {
      if (response['statusCode'] == 200) {
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
  trending() {
    let URL = appConstant.baseUrl + 'vendor/getCategoryList';
    this.wakiservice.createGetRequest(URL).subscribe((response: any) => {
      if (response['statusCode'] == 200) {
        this.categoryList = response['result'];
        // this.toastr.success(response['statusMessage']);
        // console.log(this.tempLang['lng_code']);
      }
    });
  }



  ngAfterViewInit(): void {

  }

}
