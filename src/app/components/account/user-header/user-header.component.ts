import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  currentUrlArr:any=[];
  user:any={};
  userExist:boolean=false;
  currentUrl:any;
  constructor(private router:Router) { 
    this.currentUrlArr = this.router.url.split('/');
    if(this.currentUrlArr.length>1)
    this.currentUrl =  this.currentUrlArr[1];
       if(localStorage.getItem('userLoginDetail')){
      this.user = JSON.parse(localStorage.getItem('userLoginDetail')) ;
      this.userExist=true;
    }
  }
  ngAfterViewInit(): void {
//     $('body').on('click', 'li', function() {
//       $('li.active').removeClass('active');
//       $(this).addClass('active');
// });
$('li').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
  }

}
