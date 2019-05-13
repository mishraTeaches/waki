import{Component,OnInit,Input,SimpleChange,EventEmitter,Output} from '@angular/core';
import {Router} from '@angular/router';
//import {DataService} from '../../services/http-service';

declare var $:any;

@Component({
    selector:'custum-bar-rating',
     template:` <i class="glyphicon glyphicon-star givestar"  *ngFor = "let item of ratingMax;let rateIndex = index" [ngClass]="{'givestar':item == 'give'}" aria-hidden="true"></i>
                `
     //providers: [DataService]
})
// [class.fa fa-star-half-o]="item=='half'"
export class ProductRate implements OnInit{
    //router:Router;
    //dataServices:DataService;
     @Input('ratingCount') ratingCount:number;
     @Input('max') max:number;
     updateRating:number = 0;
     ratingMax:any =  [];
    constructor(private router:Router)
    {
        this.router=router;

    }
    ngOnChanges(change:{[currentLanguageData:string]:SimpleChange} ){
     // console.log(JSON.stringify(change));
     // if(this.staticBlocksData['currentValue'])
      // this.setBLockData();

      if(this.ratingCount != undefined)
        this.createRating();
}
createRating()
{
//  console.log("ratingCount=="+this.ratingCount)
    let fractionVal:any = (this.ratingCount%parseInt(this.ratingCount.toString()))
    this.ratingMax = [];
    let item:string;
   // console.log("parseInt(this.ratingCount.toString())=="+parseInt(this.ratingCount.toString()))
if(this.max > 0){
  for(let i = 0;i<this.max;i++) {
      if(parseInt(this.ratingCount.toString()) > i)
      item = 'give'
      else if(parseInt(this.ratingCount.toString()) == i && fractionVal > .4)
      item = 'give';
      else
      item = 'glyphicon glyphicon-star';

   this.ratingMax.push(item);

}

}


}
ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

}


ngOnInit(){
//      text: string = "view";
// $('.category.selected').text()
}
//  ngAfterViewInit(){
//     var value=$('.category.selected').text();
//     console.log(value)
//     console.log(this.redirectService.redirect_menucategory().current_page)
//     }



}
