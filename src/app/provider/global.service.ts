import { Injectable } from '@angular/core';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  lazyLoad(){
          
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   let clientHeight =  document.documentElement.clientHeight || document.body.clientHeight;
       $("img.loading").each(function(){
    let element = this;
     let offsetTopElement = $(element).offset().top;
     
     if(scrollTop > offsetTopElement-clientHeight){
       
           $(element).attr("src",$(element).data("src"));
           $(element).addClass("loaded");
           $(element).removeClass("loading");
       
     }
     
   });
  
   
      
  }
}
