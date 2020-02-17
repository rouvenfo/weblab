import { Component, OnInit } from '@angular/core';
import { TippspielApiService } from '../tippspiel-api.service';
import { LoginObject } from './loginObject';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginFalse: boolean;
  is_register: boolean;

  constructor(private tippspielApiService: TippspielApiService, private router: Router, public authenticationService: AuthenticationServiceService) { 
    if(this.router.url == "/logout"){
      this.authenticationService.logout();
    }
  }

  ngOnInit() {
    console.log(this.router.url);
   }

  onSubmit(){
      this.tippspielApiService.checkLogin(this.username, this.password).subscribe(value => this.setLogin(value));
  }

  setLogin(loginObject: LoginObject){
    if(loginObject.success){
      var now = new Date();
      now.setHours(now.getHours() + 1)
      localStorage.setItem('session', JSON.stringify({ token: loginObject.token, expiration: now, username: this.username}));
      this.authenticationService.setToken();
      this.router.navigate(['/']);
      this.loginFalse = false;
      setTimeout(() => window.location.href = "#/logout", 1000 * 60 * 60);
    }
    else{
      this.loginFalse = true;
      localStorage.clear();
    }
  }

}
