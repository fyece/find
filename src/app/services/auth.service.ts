import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // baseUrl = 'http://orderfinder';
  baseUrl = 'https://gp.akbarsmed.ru';
  id = '';
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

  logout() {
    this.isAuth = false;
    this.router.navigateByUrl('/login');
  }
}
