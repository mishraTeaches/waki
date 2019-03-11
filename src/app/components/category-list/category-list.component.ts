import { Component, OnInit } from '@angular/core';
import { appConstant } from 'src/app/constant/app.constant';
import { ChangeLangService } from 'src/app/provider/change-lang.service';
import { WakiServiceService } from 'src/app/service/waki-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  currentLanguageData:any={}
  
  constructor(private languageTranslateInfoService:ChangeLangService,private wakiservice:WakiServiceService) { 
    // languageTranslateInfoService.translateInfo.subscribe((data) => {
    //   if(data){
    //              this.currentLanguageData = data;
    //              this.categoryList();
    //            }
    //    });
  }

  ngOnInit() {
  }

}
