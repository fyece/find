import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'akbars';
  isAuth = true;
  constructor(private http: HttpClient) {}

  login(loginDto: LoginDto) {
    const url = `${this.baseUrl}/login`;
    const responce = this.http.post(url, loginDto);
    if (true) {
      this.isAuth = true;
    }
    return responce;
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }
}
