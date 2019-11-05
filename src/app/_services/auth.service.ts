import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UserData } from '../_models/user-data';

const TOKEN_KEY = 'AdministratorTokenKey';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authData = new BehaviorSubject<UserData | null>(null);
  constructor(private router: Router) {
    this.setToken();
  }

  login(token: UserData) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    this.setToken();
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authData.next(null);
    this.router.navigate(['/']);
  }

  setToken() {
    const userData: UserData = JSON.parse(localStorage.getItem(TOKEN_KEY)) as UserData;
    this.authData.next(userData);
  }

  loggedIn() {
    return (this.authData.value) ? true : false;
  }

  headers() {
    const token = this.authData.value.token; // ) ? this.authData.value.token : 'qwerty';
    return new HttpHeaders().set('PsyAuth', token);
  }

  getUserId() {
    // const token = this.authToken.value;
    // const id = (token) ? (token as any).id : '111';
    return this.authData.value.id;
  }

  getLogin() {
    return this.authData.value.login;
  }

  getOrganizationName() {
    return this.authData.value.organization;
  }

  // getToken() {
  //   const token = JSON.parse(localStorage.getItem(TOKEN_KEY));
  //   console.log(token);
  //   return token;
  // }

}
