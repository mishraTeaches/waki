import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from  "@angular/common/http";
import { map,catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject,throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WakiServiceService {
  constructor(private http: HttpClient) { }
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: any) {
    this.messageSource.next(message)
  }
  createGetRequest(url, isHeader) {
      if (isHeader == 0) {
        var httpOptions;
        httpOptions = {
          headers: new HttpHeaders({ "Content-Type": "application/json"})
        }
        return this.http.get(url, httpOptions)
      }
       if (isHeader == 1) {
        let token = (localStorage.getItem("sociallogintoken") || localStorage.getItem("accessToken"));
        // console.log('token', localStorage.token)
        const httpOptions = {
          headers: new HttpHeaders({
            // 'Content-Type':  'application/json',
            // 'Authorization': 'my-auth-token',
            'accessToken': (token['accessToken'] || token)})
        };
        return this.http.get(url, httpOptions)
      }

  }
  createPostRequest(url, data, isHeader): Observable<any> {
    if (isHeader == 0) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }
      return this.http.post( url, data, httpOptions)
    }
    else if (isHeader == 1) {
      var httpOptions;
      // let token=JSON.parse(localStorage.getItem("userLoginDetail"));
      let token = (localStorage.getItem("sociallogintoken") || localStorage.getItem("accessToken") );
      httpOptions = {

        headers: new HttpHeaders({
          "accessToken": (token['accessToken'] || token),
          // "_id": localStorage.adminId,
          "Content-Type": "application/json"
        })
      }
      return this.http.post(url, data, httpOptions).pipe(catchError(this.handleError));
    }
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
      console.log("error",errorMessage);
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
