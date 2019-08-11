import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    private consolrUrl = 'http://localhost:8093/';

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let req = request;
        if (request.url.startsWith('$')) {
            req = request.clone({
                url: (this.consolrUrl + request.url.substring(1))
            });
        }

        return next.handle(req);

    }
}
