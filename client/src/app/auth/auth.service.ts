import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../user';
import { environment } from '../../environments/environment';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.api_url

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  signin(email: string, password: string) {
    const url = `${this.baseUrl}/auth/signin`
    return this.http.post<UserResponse>(url, {email, password});
  }

  signup(user: User) {
    const url = `${this.baseUrl}/auth/signup`
    return this.http.post<UserResponse>(url, user);
  }

  signout(){
    this.tokenService.removeToke();
  }

  getUserToken(){
    return this.tokenService.getToken();
  }

  isAuthenticated(){
    const token = this.getUserToken();
    return token !== null && token !== undefined && token !== '';
  }

  checkTokenError(err: number | string) {
    const status = Number(err);

    if (status === 403) {
      this.tokenService.removeToke()
      this.router.navigate(['/login'])
    }
  }

  checkTokenValidity(){
    const url = `${this.baseUrl}/auth/validate`;
    const headers = this.getHttpOptions()

    const response = this.http.get(url);    
  }
  
  getHttpOptions() {
    const token = this.getUserToken();

    const headers = {
      'Content-Type':  'application/json',
      'authorization': `bearer ${token}`
    }

    // headers.append('Content-Type', 'application/json');

    // if (token) {
    //   headers.append('authorization', `bearer ${token}`)
    // }

    console.log(headers)

    return headers;
  }

}
