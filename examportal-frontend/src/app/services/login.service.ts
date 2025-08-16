import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) { }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/auth/current-user`);
  }

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/auth/generate-token`, loginData);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    this.loginStatus.next(true); // 🔁 update reactive status
    return true;
  }

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('token');
    return !!tokenStr;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatus.next(false); // 🔁 update reactive status
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user?.authorities[0]?.authority || null;
  }
}
