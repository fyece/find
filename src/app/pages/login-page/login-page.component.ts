import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoading = false

  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private titleService: Title, private authService: AuthService) {    
    this.titleService.setTitle('Вход')
   }

  login(){
    this.isLoading = true
    this.authService.login(this.loginForm.controls['login'].value, this.loginForm.controls['password'].value)
    
    if(this.authService.isAuth){
      this.router.navigateByUrl('/find');
    } else{
      console.warn("wrong login or password")
    }
    this.isLoading = false
  }

  ngOnInit(): void {
  }

}
