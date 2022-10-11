import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://orderfinder';
  token = '';
  isAuth = false;
  wrongLogin = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(login: string, pass: string) {
    const url = `${this.baseUrl}/login`;
    this.http.post<any>(url, { login, pass }).subscribe((data) => {
      if (data[0].Res == 1) {
        this.isAuth = true;
        this.wrongLogin = false;
        this.router.navigateByUrl('/find');
      } else {
        this.wrongLogin = true;
      }
    });
  }

  loginWithToken(token: string) {
    if (token == '123') {
      this.token = token;
      this.isAuth = true;
      console.log(`auth with token ${this.token}`);
    }
  }

  checkToken(token: string) {
    return token == '123';
  }

  logout() {
    this.isAuth = false;
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }
}
