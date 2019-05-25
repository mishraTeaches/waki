import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartdetailService {
  private messageSource = new BehaviorSubject('0');
  private wishlistSource = new BehaviorSubject('0');
  currentMessage = this.messageSource.asObservable();
  wishlistMessage = this.wishlistSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  wishlistCount(message: any) {
    this.wishlistSource.next(message);
  }
}
