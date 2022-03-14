import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return of(this.authService.isAuthenticated()).pipe(map(
      (response: boolean)=>{
        if(response) {
          return true
        }
        this.router.navigate(['/signin'])
        return false
      }
      ));
  }

  constructor(private authService: AuthService,
              private router: Router){

  }
  
}
