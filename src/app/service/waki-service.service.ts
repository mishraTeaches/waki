import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from  "@angular/common/http";
import { map,catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WakiServiceService {

  constructor(private http:HttpClient) { }

  createGetRequest(url:string){
    return this.http.get(url)
  }

  createPostRequest(url:any,data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(url,data,httpOptions);
  }
}
