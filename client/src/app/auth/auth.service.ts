import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../user';
import { environment } from '../../environments/environment';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.api_url

  constructor(private http: HttpClient, private tokenService: TokenService) { }

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

}
