import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://orderfinder';
  isAuth = false;


  constructor(private http: HttpClient) {}

  login(login: string, pass:string) {
    const url = `${this.baseUrl}/login`;
    this.http.post<any>(url, {login, pass}).subscribe(data=> this.isAuth = data[0].Res == 1? true: false);
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }
}
