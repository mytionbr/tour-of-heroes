import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const httpOptions = this.authService.getHttpOptions();

    req  = req.clone({
        setHeaders: {...httpOptions}
      })
    
    return next.handle(req);
  }
}
