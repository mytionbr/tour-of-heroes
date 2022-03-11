import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.api_url

  constructor(private http: HttpClient) { }

  signin(email: string, password: string) {
    const url = `${this.baseUrl}/auth/signin`
    return this.http.post<User>(url, {email, password});
  }

}
