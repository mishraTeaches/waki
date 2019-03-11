import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(private router:Router,private toastr: ToastrService){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem("userLoginDetail") || localStorage.getItem("sociallogin"))
    return true;
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
