import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeLangService {

  translateInfo:BehaviorSubject<any>;
  constructor() { 
    this.translateInfo=new BehaviorSubject<any>(this.translateInfo);
  }
  change(translateData:any){
    this.translateInfo.next(translateData);
  }
}
