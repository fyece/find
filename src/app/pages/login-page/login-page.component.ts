import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isLoading = false;
  wrongLogin = this.authService.wrongLogin;
  token = '';

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private titleService: Title,
    private router: ActivatedRoute,
    public authService: AuthService
  ) {
    this.titleService.setTitle('Вход');
  }

  login() {
    this.isLoading = true;
    this.authService.login(
      this.loginForm.controls['login'].value,
      this.loginForm.controls['password'].value
    );
    this.isLoading = false;
  }

  loginWithV3() {
    this.router.queryParamMap.subscribe(
      (params) => (this.token = params.get('token') ?? '')
    );
    console.log(this.token);
    this.authService.loginWithToken(this.token);
  }

  ngOnInit(): void {
    this.loginWithV3();
  }
  ngOnChanges(): void {
    this.loginWithV3();
  }
}
