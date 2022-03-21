import { Injectable } from '@angular/core';
import { UserInfo } from './user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setUserInfo(userInfo: UserInfo) {
    const userInfoString = JSON.stringify(userInfo);
    localStorage.setItem('userInfo', userInfoString);
  }

  getUserInfo(): UserInfo | null{
    const untreatedUserInfo = localStorage.getItem('userInfo');
    
    if (!untreatedUserInfo) return null

    const userInfo = JSON.parse(untreatedUserInfo);
    return userInfo;
    
  }

  getToken() {
    const untreatedUserInfo = localStorage.getItem('userInfo');
    
    if (!untreatedUserInfo) return null
    
    const userInfo = JSON.parse(untreatedUserInfo);
    return userInfo.token;
  }

  removeToke() {
    localStorage.removeItem('userInfo')
  }
}
