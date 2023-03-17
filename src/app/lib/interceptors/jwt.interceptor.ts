import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { catchError, delay, Observable, retry, throwError } from "rxjs";
import { StorageService } from "../services/storage-service/storage.service";
import { DatePipe } from "@angular/common";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token: string = "";
  /**
   *
   */
  constructor(private _enc: StorageService,
    private datePipe: DatePipe) {


  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var data = this._enc.getLocalStorageItem('currentUser')
    var customReq = request.clone();
    if (data) {
      this.token = JSON.parse(data).token
      var expiry = this._enc.getDecodedAccessToken(this.token).expiry
      var now = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss')?.toString()
      if (Number(now) > Number(expiry)) {
        alert("expired!!")
      }
      customReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`),
      });

    }


    return next.handle(customReq).pipe(
      // retry(3),
      // delay(1000),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.error('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.error('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        return throwError(errorMsg);
      }
      ))
  }
}