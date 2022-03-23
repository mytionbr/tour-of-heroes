import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpOptions = this.authService.getHttpOptions();

    req = req.clone({
      setHeaders: { ...httpOptions }
    });

    return next.handle(req).pipe(
      tap(()=>{},
      (err) => {
        if(err instanceof HttpErrorResponse){
          if (err.status === 401) {
            this.authService.signout();
            this.router.navigate(['/signin'])
          }
          return;
        }
      })
    )
  }
}
