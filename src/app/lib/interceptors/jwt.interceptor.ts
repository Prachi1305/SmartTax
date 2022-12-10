import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { catchError, delay, Observable, retry, throwError } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const customReq = request.clone({

    // });
    return next.handle(request).pipe(
      retry(3),
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.error('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.error('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      }
      ))
  }
}