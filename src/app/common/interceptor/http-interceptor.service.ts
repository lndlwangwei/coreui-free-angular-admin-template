import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AlertService} from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    private consolrUrl = 'http://localhost:8093/';

    constructor(public alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let req = request;
        if (request.url.startsWith('$')) {
            req = request.clone({
                url: (this.consolrUrl + request.url.substring(1))
            });
        }

        return next.handle(req).pipe(tap(() => {}, err => {
          if (err instanceof HttpErrorResponse) {
            this.alertService.alertError(err.error.message);
          }
        }));

    }
}
