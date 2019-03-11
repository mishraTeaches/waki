import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sendDataService {
    send_data:BehaviorSubject<any>;
  constructor() { 
    this.send_data=new BehaviorSubject<any>(this.send_data);
  }
  change(translateData:any){
    this.send_data.next(translateData);
  }
}
